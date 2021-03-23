import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";

import { Session as Bridge } from "kumo-client";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import TitledCard from "./TitledCard";
import {
  SessionContext,
  useLogger,
  useStateOnce,
  useStoreState,
} from "../hooks";

function SessionProvider({ children }) {
  const logger = useLogger();

  const [session, setSession] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const [webSocketUrl, setWebSocketUrl] = useStoreState(
    "webSocketUrl",
    "ws://localhost:8080"
  );

  const [autoConnect, setAutoConnect] = useStoreState("autoConnect", false);

  const bridge = useStateOnce(() => {
    return new Bridge()
      .onConnect((newSession) => {
        logger.success(`Connected to the bridge server on ${webSocketUrl}!`);

        setSession(newSession);
        setConnecting(false);
        setAutoConnect(true);
      })
      .onDisconnect((code, reason) => {
        logger.error(
          "Disconnected from the bridge server!" +
            ` ${reason || "no reason"} (${code})`
        );

        setSession(null);
        setConnecting(false);
        setAutoConnect(false);
      })
      .onError((err) => {
        logger.error(`Found error! ${err.message}`);
      });
  });

  useEffect(() => {
    if (bridge !== null && session === null && autoConnect && !connecting) {
      setConnecting(true);
      bridge.connect(webSocketUrl);
    }
  });

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      bridge.connect(webSocketUrl);
    }, 500);
  };

  const validateWebSocketUrl = () => {
    return webSocketUrl.startsWith("ws://") && webSocketUrl.length > 5;
  };

  const onWebSocketUrlChange = (event) => {
    setWebSocketUrl(event.target.value);
    setAutoConnect(false);
  };

  if (session === null) {
    if (autoConnect) {
      return null;
    }

    return (
      <Container maxWidth="xs">
        <Box paddingTop={8}>
          <TitledCard title="Create a New Session" raised>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="WebSocket URL"
                  value={webSocketUrl}
                  onChange={onWebSocketUrlChange}
                  error={!validateWebSocketUrl()}
                  helperText={
                    validateWebSocketUrl() ? null : "Invalid WebSocket URL"
                  }
                  disabled={connecting}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleConnect}
                  disabled={!validateWebSocketUrl() || connecting}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  {connecting ? <CircularProgress size={24} /> : "Connect"}
                </Button>
              </Grid>
            </Grid>
          </TitledCard>
        </Box>
      </Container>
    );
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SessionProvider;
