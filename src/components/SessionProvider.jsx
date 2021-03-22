import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  Grid,
  TextField,
} from "@material-ui/core";

import { Session as Bridge } from "kumo-client";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import TitledCard from "./TitledCard";
import useStoreState from "../utilities";

const SessionContext = createContext(null);

const useSession = () => {
  return useContext(SessionContext);
};

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

  const onConnect = () => {
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

  const NewSessionCard = () => {
    return (
      <TitledCard title="Create a New Session" raised>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="WebSocket URL"
              value={webSocketUrl}
              onChange={onWebSocketUrlChange}
              error={!validateWebSocketUrl()}
              helperText={validateWebSocketUrl() ? "" : "Invalid WebSocket URL"}
              disabled={connecting}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onConnect}
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
    );
  };

  return (
    <Box>
      <Fade in={session !== null}>
        <Box>
          <SessionContext.Provider value={session}>
            {session !== null ? children : ""}
          </SessionContext.Provider>
        </Box>
      </Fade>
      <Fade in={session === null && !autoConnect}>
        <Box position="absolute" top={0} minWidth="100vw" minHeight="100vh">
          <Container maxWidth="xs">
            <Box paddingTop={8}>
              <NewSessionCard />
            </Box>
          </Container>
        </Box>
      </Fade>
    </Box>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { SessionProvider, useSession };
