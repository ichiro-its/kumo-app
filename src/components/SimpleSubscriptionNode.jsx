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

function SimpleSubscription() {
  const logger = useLogger();
  const node = useNode();

  const [subscription, setSubscription] = useState(null);
  const [creating, setCreating] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (subscription === null && !creating) {
      setCreating(true);
      node
        .createSubscription("std_msgs/msg/String", "/topic", (message) => {
          setMessages((prevMessages) => {
            const newMessages = prevMessages.slice();
            newMessages.unshift({
              id: uuid(),
              data: message.data,
            });

            return newMessages;
          });
        })
        .then((newSubscription) => {
          setSubscription(newSubscription);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Subscription! ${err.message}`);
          setSubscription(null);
        })
        .finally(() => {
          setCreating(false);
        });
    }
  });

  const MessageList = () => {
    if (messages.length <= 0) {
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

    const messageItems = messages.map((message) => {
      return (
        <ListItem key={message.id} button divider>
          <ListItemText primary={message.data} />
        </ListItem>
      );
    });

    return <List disablePadding>{messageItems}</List>;
  };

  return (
    <Box height={200} overflow="auto">
      <MessageList />
    </Box>
  );
}

function SimpleSubscriptionNode() {
  return (
    <TitledCard title="Simple Subscription Node" raised disablePadding>
      <NodeProvider nodeName="simple_subscription">
        <SimpleSubscription />
      </NodeProvider>
    </TitledCard>
  );
}

export default SimpleSubscriptionNode;
