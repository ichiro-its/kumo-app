import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
  useTheme,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import { useSession } from "./SessionProvider";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    headerRoot: {
      backgroundColor: theme.palette.primary.main,
    },
    headerTitle: {
      color: theme.palette.common.white,
    },
  };
});

function SimpleClientNode() {
  const classes = useStyles();
  const logger = useLogger();

  const [node, setNode] = useState(null);
  const [client, setClient] = useState(null);
  const [calling, setCalling] = useState(false);

  const randomInteger = () => {
    return Math.floor(Math.random() * 10);
  };

  const [a, setA] = useState(randomInteger);
  const [b, setB] = useState(randomInteger);
  const [result, setResult] = useState("");

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
    } else if (client === null) {
      node
        .createClient("example_interfaces/srv/AddTwoInts", "/add_two_ints")
        .then((newClient) => {
          setClient(newClient);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Client! ${err.message}`);
          setClient(null);
        });
    }
  });

  const onAChange = (event) => {
    setA(event.target.value);
  };

  const onBChange = (event) => {
    setB(event.target.value);
  };

  const onCall = () => {
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
    <Card raised>
      <CardHeader
        title="Simple Client Node"
        classes={{
          root: classes.headerRoot,
          title: classes.headerTitle,
        }}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="A"
              value={a}
              onChange={onAChange}
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
              onChange={onBChange}
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
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={onCall}
          disabled={client === null || calling}
          color="primary"
          variant="contained"
          fullWidth
        >
          {calling ? <CircularProgress size={24} /> : "Call"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleClientNode;
