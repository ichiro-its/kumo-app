import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import { useNode, useService } from "../../hooks";
import BoxedCircularProgress from "../BoxedCircularProgress";
import TitledCard from "../TitledCard";

function SimpleServiceNode() {
  const node = useNode("simple_service");

  const [requests, setRequests] = useState([]);

  const service = useService(
    node,
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
  );

  const Content = () => {
    if (service === null) {
      return <BoxedCircularProgress />;
    }

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
  };

  return (
    <TitledCard title="Simple Service Node" raised disablePadding>
      <Content />
    </TitledCard>
  );
}

export default SimpleServiceNode;
