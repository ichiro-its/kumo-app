import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

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

function SimpleServiceNode() {
  const classes = useStyles();
  const logger = useLogger();

  const [node, setNode] = useState(null);
  const [service, setService] = useState(null);
  const [requests, setRequests] = useState([]);

  const session = useSession();

  useEffect(() => {
    if (node === null) {
      session
        .createNode("simpe_service")
        .then((newNode) => {
          setNode(newNode);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Node! ${err.message}`);
          setNode(null);
        });
    } else if (service === null) {
      node
        .createService(
          "example_interfaces/srv/AddTwoInts",
          "/add_two_ints",
          (request) => {
            const sum = request.a + request.b;

            setRequests((prevRequests) => {
              const newRequests = prevRequests.slice();
              newRequests.unshift({
                id: uuid(),
                a: request.a,
                b: request.b,
                sum,
              });

              return newRequests;
            });

            return { sum };
          }
        )
        .then((newService) => {
          setService(newService);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Subscription! ${err.message}`);
          setService(null);
        });
    }
  });

  const RequestList = () => {
    if (requests.length <= 0) {
      return (
        <Grid
          container
          style={{ minHeight: "100%" }}
          justify="center"
          alignItems="center"
        >
          <Typography>No data</Typography>
        </Grid>
      );
    }

    const requestItems = requests.map((request) => {
      return (
        <ListItem key={request.id} button>
          <ListItemText
            primary={`${request.a} + ${request.b} = ${request.sum}`}
          />
        </ListItem>
      );
    });

    return <List disablePadding>{requestItems}</List>;
  };

  return (
    <Card raised>
      <CardHeader
        title="Simple Service Node"
        classes={{
          root: classes.headerRoot,
          title: classes.headerTitle,
        }}
      />
      <CardContent style={{ height: 200, overflow: "auto" }}>
        <RequestList />
      </CardContent>
    </Card>
  );
}

export default SimpleServiceNode;
