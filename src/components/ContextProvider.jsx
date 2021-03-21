import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Fade,
  makeStyles,
  useTheme,
  TextField,
} from "@material-ui/core";

import { Session } from "kumo-client";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import Store from "store2";

import { useLogger } from "./LoggerProvider";

const ContextContext = createContext(null);

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

function ContextProvider({ children }) {
  const classes = useStyles();
  const logger = useLogger();

  const [session] = useState(new Session());
  const [context, setContext] = useState(null);

  const [webSocketUrl, setWebSocketUrl] = useState(
    Store.get("webSocketUrl", "ws://localhost:8080")
  );

  const [connecting, setConnecting] = useState(false);

  session
    .onConnect((newContext) => {
      logger.success("Connected to the bridge server!");

      setContext(newContext);
      setConnecting(false);

      Store.set("webSocketUrlCanConnect", true);
    })
    .onDisconnect((code, reason) => {
      logger.error(`Disconnected from the bridge server! ${reason} (${code})`);

      setContext(null);
      setConnecting(false);

      Store.set("webSocketUrlCanConnect", false);
    })
    .onError((err) => {
      logger.error(`Found error! ${err.message}`);
    });

  useEffect(() => {
    if (context === null && Store.get("webSocketUrlCanConnect", false)) {
      session.connect(webSocketUrl);
    }
  });

  const onConnectButton = () => {
    setTimeout(() => {
      session.connect(webSocketUrl);
    }, 1000);

    setConnecting(true);
  };

  const validateWebSocketUrl = () => {
    return webSocketUrl.startsWith("ws://") && webSocketUrl.length > 5;
  };

  const onWebSocketUrlChange = (event) => {
    setWebSocketUrl(event.target.value);
    Store.set("webSocketUrl", event.target.value);
    Store.set("webSocketUrlCanConnect", false);
  };

  return (
    <div>
      <Fade in={context !== null}>
        <div>
          <ContextContext.Provider value={context}>
            {children}
          </ContextContext.Provider>
        </div>
      </Fade>
      <Fade in={context === null}>
        <div>
          <Container maxWidth="xs">
            <Card>
              <CardHeader
                title="Create a New Session"
                classes={{
                  root: classes.headerRoot,
                  title: classes.headerTitle,
                }}
              />
              <CardContent>
                <TextField
                  label="WebSocket URL"
                  value={webSocketUrl}
                  onChange={onWebSocketUrlChange}
                  error={!validateWebSocketUrl()}
                  helperText={
                    validateWebSocketUrl() ? "" : "Invalid WebSocket URL"
                  }
                  disabled={connecting}
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
              <CardActions>
                <Button
                  onClick={onConnectButton}
                  disabled={!validateWebSocketUrl() || connecting}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  {connecting ? <CircularProgress size={24} /> : "Connect"}
                </Button>
              </CardActions>
            </Card>
          </Container>
        </div>
      </Fade>
    </div>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ContextProvider;
