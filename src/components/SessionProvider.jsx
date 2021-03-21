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

import { Session as Bridge } from "kumo-client";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import useStoreState from "../utilities";

const SessionContext = createContext(null);

const useSession = () => {
  return useContext(SessionContext);
};

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

function SessionProvider({ children }) {
  const classes = useStyles();
  const logger = useLogger();

  const [bridge, setBridge] = useState(null);
  const [session, setSession] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const [webSocketUrl, setWebSocketUrl] = useStoreState(
    "webSocketUrl",
    "ws://localhost:8080"
  );

  const [autoConnect, setAutoConnect] = useStoreState("autoConnect", false);

  useEffect(() => {
    if (bridge === null) {
      const newBridge = new Bridge()
        .onConnect((newSession) => {
          logger.success("Connected to the bridge server!");

          setSession(newSession);
          setConnecting(false);
          setAutoConnect(true);
        })
        .onDisconnect((code, reason) => {
          logger.error(
            `Disconnected from the bridge server! ${reason} (${code})`
          );

          setSession(null);
          setConnecting(false);
          setAutoConnect(false);
        })
        .onError((err) => {
          logger.error(`Found error! ${err.message}`);
        });

      setBridge(newBridge);
    } else if (session === null && autoConnect) {
      bridge.connect(webSocketUrl);
    }
  });

  const onConnectButton = () => {
    setTimeout(() => {
      bridge.connect(webSocketUrl);
    }, 500);

    setConnecting(true);
  };

  const validateWebSocketUrl = () => {
    return webSocketUrl.startsWith("ws://") && webSocketUrl.length > 5;
  };

  const onWebSocketUrlChange = (event) => {
    setWebSocketUrl(event.target.value);
    setAutoConnect(false);
  };

  return (
    <div>
      <Fade in={session !== null}>
        <div>
          <SessionContext.Provider value={session}>
            {session !== null ? children : ""}
          </SessionContext.Provider>
        </div>
      </Fade>
      <Fade in={session === null && !autoConnect}>
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

SessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { SessionProvider, useSession };
