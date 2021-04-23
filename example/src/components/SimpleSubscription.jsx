import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { NodeProvider, SubscriptionProvider, TitledCard } from "kumo-app";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function SimpleSubscription() {
  const [messages, setMessages] = useState([]);

  const subscriptionCallback = (message) => {
    setMessages((prevMessages) => {
      const newMessages = prevMessages.slice();
      newMessages.unshift({
        id: uuid(),
        data: message.data,
      });

      return newMessages;
    });
  };

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
    <TitledCard title="Simple Subscription Node" raised disablePadding>
      <NodeProvider nodeName="simple_subscription">
        <SubscriptionProvider
          messageType="std_msgs/msg/String"
          topicName="/topic"
          callback={subscriptionCallback}
        >
          <Box height={200} overflow="auto">
            <MessageList />
          </Box>
        </SubscriptionProvider>
      </NodeProvider>
    </TitledCard>
  );
}

export default SimpleSubscription;
