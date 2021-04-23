import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import {
  BoxedCircularProgress,
  NodeProvider,
  PublisherProvider,
  TitledCard,
  useHandleProcess,
  useLogger,
  usePublisher,
} from "kumo-app";

import React, { useState } from "react";

function PublishForm() {
  const publisher = usePublisher();
  const logger = useLogger();

  const [data, setData] = useState("Hello World! 0");

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

  const [publishing, handlePublish] = useHandleProcess(() => {
    return publisher
      .publish({ data })
      .then(() => {
        incrementData();
      })
      .catch((err) => {
        logger.error(`Failed to publish data! ${err.message}.`);
      });
  }, 500);

  const handleDataChange = (ev) => {
    setData(ev.target.value);
  };

  if (publisher === null) {
    return <BoxedCircularProgress />;
  }

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

function SimplePublisher() {
  return (
    <TitledCard title="Simple Publisher Node" raised>
      <NodeProvider nodeName="simple_publisher">
        <PublisherProvider messageType="std_msgs/msg/String" topicName="/topic">
          <PublishForm />
        </PublisherProvider>
      </NodeProvider>
    </TitledCard>
  );
}

export default SimplePublisher;
