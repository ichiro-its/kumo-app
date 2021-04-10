import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import {
  BoxedCircularProgress,
  TitledCard,
  useNode,
  useClient,
  useHandleProcess,
  useLogger,
} from "kumo-app";

import React, { useState } from "react";

function SimpleClientNode() {
  const logger = useLogger();
  const node = useNode("simple_client");

  const client = useClient(
    node,
    "example_interfaces/srv/AddTwoInts",
    "/add_two_ints"
  );

  const randomInteger = () => {
    return Math.floor(Math.random() * 10);
  };

  const [a, setA] = useState(randomInteger);
  const [b, setB] = useState(randomInteger);
  const [result, setResult] = useState("");

  const [calling, handleCall] = useHandleProcess(() => {
    return client
      .call({ a, b })
      .then((response) => {
        setA(randomInteger());
        setB(randomInteger());
        setResult(`${a} + ${b} = ${response.sum}`);
      })
      .catch((err) => {
        logger.error(`Failed to call data! ${err.message}`);
      });
  }, 500);

  const handleAChange = (ev) => {
    const newA = parseInt(ev.target.value, 10);
    setA(Number.isNaN(newA) ? a : newA);
  };

  const handleBChange = (ev) => {
    const newB = parseInt(ev.target.value, 10);
    setB(Number.isNaN(newB) ? b : newB);
  };

  const Content = () => {
    if (client === null) {
      return <BoxedCircularProgress />;
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="A"
            value={a}
            onChange={handleAChange}
            disabled={client === null || calling}
            variant="outlined"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="B"
            value={b}
            onChange={handleBChange}
            disabled={client === null || calling}
            variant="outlined"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Result"
            value={result}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleCall}
            disabled={client === null || calling}
            color="primary"
            variant="contained"
            fullWidth
          >
            {calling ? <CircularProgress size={24} /> : "Call"}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <TitledCard title="Simple Client Node" raised>
      <Content />
    </TitledCard>
  );
}

export default SimpleClientNode;