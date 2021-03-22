import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import React, { useState } from "react";

import BoxedCircularProgress from "./BoxedCircularProgress";
import { useLogger } from "./LoggerProvider";
import { NodeProvider, useClient } from "./NodeProvider";
import TitledCard from "./TitledCard";

function SimpleClient() {
  const logger = useLogger();

  const client = useClient(
    "example_interfaces/srv/AddTwoInts",
    "/add_two_ints"
  );

  const randomInteger = () => {
    return Math.floor(Math.random() * 10);
  };

  const [a, setA] = useState(randomInteger);
  const [b, setB] = useState(randomInteger);
  const [result, setResult] = useState("");
  const [calling, setCalling] = useState(false);

  if (client === null) {
    return <BoxedCircularProgress />;
  }

  const handleAChange = (ev) => {
    const newA = parseInt(ev.target.value, 10);
    setA(Number.isNaN(newA) ? a : newA);
  };

  const handleBChange = (ev) => {
    const newB = parseInt(ev.target.value, 10);
    setB(Number.isNaN(newB) ? b : newB);
  };

  const handleCall = () => {
    if (client !== null) {
      setCalling(true);
      setTimeout(() => {
        client
          .call({ a, b })
          .then((response) => {
            setA(randomInteger());
            setB(randomInteger());
            setResult(`${a} + ${b} = ${response.sum}`);
          })
          .catch((err) => {
            logger.error(`Failed to call data! ${err.message}`);
          })
          .finally(() => {
            setCalling(false);
          });
      }, 500);
    }
  };

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
}

function SimpleClientNode() {
  return (
    <TitledCard title="Simple Client Node" raised>
      <NodeProvider nodeName="simple_client">
        <SimpleClient />
      </NodeProvider>
    </TitledCard>
  );
}

export default SimpleClientNode;
