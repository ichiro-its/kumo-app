import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import React, { useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import { NodeProvider, useNode } from "./NodeProvider";
import TitledCard from "./TitledCard";

function SimplePublisher() {
  const logger = useLogger();
  const node = useNode();

  const [publisher, setPublisher] = useState(null);
  const [creating, setCreating] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const [data, setData] = useState("Hello World! 0");

  useEffect(() => {
    if (publisher === null && !creating) {
      setCreating(true);
      node
        .createPublisher("std_msgs/msg/String", "/topic")
        .then((newPublisher) => {
          setPublisher(newPublisher);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Publisher! ${err.message}`);
          setPublisher(null);
        })
        .finally(() => {
          setCreating(false);
        });
    }
  });

  const incrementData = () => {
    const strings = data.split(" ");
    const counter = parseInt(strings[strings.length - 1], 10);
    if (Number.isNaN(counter)) {
      strings.push("0");
    } else {
      strings[strings.length - 1] = String(counter + 1);
    }

    setData(strings.join(" "));
  };

  const handleDataChange = (ev) => {
    setData(ev.target.value);
  };

  const handlePublish = () => {
    if (publisher !== null) {
      setPublishing(true);
      setTimeout(() => {
        publisher
          .publish({ data })
          .then(() => {
            incrementData();
          })
          .catch((err) => {
            logger.error(`Failed to publish data! ${err.message}`);
          })
          .finally(() => {
            setPublishing(false);
          });
      }, 500);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Data"
          value={data}
          onChange={handleDataChange}
          disabled={publisher === null || publishing}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handlePublish}
          disabled={publisher === null || publishing}
          color="primary"
          variant="contained"
          fullWidth
        >
          {publishing ? <CircularProgress size={24} /> : "Publish"}
        </Button>
      </Grid>
    </Grid>
  );
}

function SimplePublisherNode() {
  return (
    <TitledCard title="Simple Publisher Node" raised>
      <NodeProvider nodeName="simple_publisher">
        <SimplePublisher />
      </NodeProvider>
    </TitledCard>
  );
}

export default SimplePublisherNode;
