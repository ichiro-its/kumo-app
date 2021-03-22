import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import React, { useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import { NodeProvider, useNode } from "./NodeProvider";
import TitledCard from "./TitledCard";

function SimpleClient() {
  const logger = useLogger();
  const node = useNode();

  const [client, setClient] = useState(null);
  const [creating, setCreating] = useState(false);
  const [calling, setCalling] = useState(false);

  const randomInteger = () => {
    return Math.floor(Math.random() * 10);
  };

  const [a, setA] = useState(randomInteger);
  const [b, setB] = useState(randomInteger);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (client === null && !creating) {
      setCreating(true);
      node
        .createClient("example_interfaces/srv/AddTwoInts", "/add_two_ints")
        .then((newClient) => {
          setClient(newClient);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Client! ${err.message}`);
          setClient(null);
        })
        .finally(() => {
          setCreating(false);
        });
    }
  });

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
