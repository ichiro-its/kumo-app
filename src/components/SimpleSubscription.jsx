import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";

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

function SimpleSubscription() {
  const classes = useStyles();
  const logger = useLogger();

  const [node, setNode] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [messages, setMessages] = useState(["test"]);

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
            const newMessages = prevMessages.slice(-4);
            newMessages.push(message.data);

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

  return (
    <Card>
      <CardHeader
        title="Simple Subscription"
        classes={{
          root: classes.headerRoot,
          title: classes.headerTitle,
        }}
      />
      <CardContent>
        <List>
          {messages.map((message) => (
            <ListItem key={message}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default SimpleSubscription;
