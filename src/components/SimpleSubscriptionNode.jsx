import {
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

function SimpleSubscriptionNode() {
  const logger = useLogger();

  const [node, setNode] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [messages, setMessages] = useState([]);

  const session = useSession();

  useEffect(() => {
    if (node === null) {
      session
        .createNode("simple_subscription")
        .then((newNode) => {
          setNode(newNode);
        })
        .catch((err) => {
          logger.error(`Failed to create a new Node! ${err.message}`);
          setNode(null);
        });
    } else if (subscription === null) {
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
        });
    }
  });

  const MessageList = () => {
    if (messages.length <= 0) {
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

    const messageItems = messages.map((message) => {
      return (
        <ListItem key={message.id} button>
          <ListItemText primary={message.data} />
        </ListItem>
      );
    });

    return <List disablePadding>{messageItems}</List>;
  };

  return (
    <TitledCard title="Simple Subscription Node" raised>
      <MessageList />
    </TitledCard>
  );
}

export default SimpleSubscriptionNode;