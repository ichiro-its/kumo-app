import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useLogger } from "./LoggerProvider";
import { useSession } from "./SessionProvider";
import TitledCard from "./TitledCard";

function SimpleServiceNode() {
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
          logger.error(`Failed to create a new Service! ${err.message}`);
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
        <ListItem key={request.id} button divider>
          <ListItemText
            primary={`${request.a} + ${request.b} = ${request.sum}`}
          />
        </ListItem>
      );
    });

    return <List disablePadding>{requestItems}</List>;
  };

  return (
    <TitledCard title="Simple Service Node" raised noPadding>
      <Box height={200} overflow="auto">
        <RequestList />
      </Box>
    </TitledCard>
  );
}

export default SimpleServiceNode;
