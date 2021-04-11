import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import {
  BoxedCircularProgress,
  TitledCard,
  useNode,
  useSubscription,
} from "kumo-app";

import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function SimpleSubscriptionNode() {
  const node = useNode("simple_subscription");

  const [messages, setMessages] = useState([]);

  const subscription = useSubscription(
    node,
    "std_msgs/msg/String",
    "/topic",
    (message) => {
      setMessages((prevMessages) => {
        const newMessages = prevMessages.slice();
        newMessages.unshift({
          id: uuid(),
          data: message.data,
        });

        return newMessages;
      });
    }
  );

  const Content = () => {
    if (subscription === null) {
      return <BoxedCircularProgress />;
    }

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
  };

  return (
    <TitledCard title="Simple Subscription Node" raised disablePadding>
      <Content />
    </TitledCard>
  );
}

export default SimpleSubscriptionNode;
