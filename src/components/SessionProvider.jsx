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
import React, { createContext, useContext, useEffect, useState } from "react";
import Store from "store2";

import { useLogger } from "./LoggerProvider";
import TitledCard from "./TitledCard";

const SessionContext = createContext(null);

const useSession = () => {
  return useContext(SessionContext);
};

function useStoreState(key, initialValue) {
  const [state, setState] = useState(Store.get(key, initialValue));

  return [
    state,
    (newState) => {
      setState(newState);
      Store.set(key, newState);
    },
  ];
}

function SessionProvider({ children }) {
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

      setBridge(newBridge);
    } else if (session === null && autoConnect) {
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

export { SessionProvider, useSession };
