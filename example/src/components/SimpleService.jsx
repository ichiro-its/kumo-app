import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { NodeProvider, ServiceProvider, TitledCard } from "kumo-app";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function SimpleService() {
  const [requests, setRequests] = useState([]);

  const serviceCallback = (request) => {
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
  };

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
    <TitledCard title="Simple Service Node" raised disablePadding>
      <NodeProvider nodeName="simple_service">
        <ServiceProvider
          serviceType="example_interfaces/srv/AddTwoInts"
          serviceName="/add_two_ints"
          callback={serviceCallback}
        >
          <Box height={200} overflow="auto">
            <RequestList />
          </Box>
        </ServiceProvider>
      </NodeProvider>
    </TitledCard>
  );
}

export default SimpleService;
