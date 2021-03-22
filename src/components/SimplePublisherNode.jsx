import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import React, { useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import { useSession } from "./SessionProvider";
import TitledCard from "./TitledCard";

function SimplePublisherNode() {
  const logger = useLogger();

  const [node, setNode] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const [data, setData] = useState("Hello World! 0");

  const session = useSession();

  useEffect(() => {
    if (node === null) {
      session
        .createNode("simple_publisher")
        .then((newNode) => {
          setNode(newNode);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Node! ${err.message}`);
          setNode(null);
        });
    } else if (publisher === null) {
      node
        .createPublisher("std_msgs/msg/String", "/topic")
        .then((newPublisher) => {
          setPublisher(newPublisher);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Publisher! ${err.message}`);
          setPublisher(null);
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

  const onDataChange = (event) => {
    setData(event.target.value);
  };

  const onPublish = () => {
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
    <TitledCard title="Simple Publisher Node" raised>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Data"
            value={data}
            onChange={onDataChange}
            disabled={publisher === null || publishing}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={onPublish}
            disabled={publisher === null || publishing}
            color="primary"
            variant="contained"
            fullWidth
          >
            {publishing ? <CircularProgress size={24} /> : "Publish"}
          </Button>
        </Grid>
      </Grid>
    </TitledCard>
  );
}

export default SimplePublisherNode;
