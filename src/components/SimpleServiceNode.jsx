import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useLogger } from "./LoggerProvider";
import { NodeProvider, useNode } from "./NodeProvider";
import TitledCard from "./TitledCard";

function SimpleService() {
  const logger = useLogger();
  const node = useNode();

  const [service, setService] = useState(null);
  const [creating, setCreating] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (service === null && !creating) {
      setCreating(true);
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
        })
        .finally(() => {
          setCreating(false);
        });
    }
  });

  const RequestList = () => {
    if (requests.length <= 0) {
      return (
        <Box
          display="flex"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>No data</Typography>
        </Box>
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
    <Box height={200} overflow="auto">
      <RequestList />
    </Box>
  );
}

function SimpleServiceNode() {
  return (
    <TitledCard title="Simple Service Node" raised disablePadding>
      <NodeProvider nodeName="simple_service">
        <SimpleService />
      </NodeProvider>
    </TitledCard>
  );
}

export default SimpleServiceNode;
