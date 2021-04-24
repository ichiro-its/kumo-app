import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";

import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import { TitledCard } from "./TitledCard";

import { useHandleProcess, useStoreState } from "../hooks";
import { useBridge, useLogger } from "../providers";

const BridgeConnection: FunctionComponent = () => {
  const bridge = useBridge();
  const logger = useLogger();

  const [connected, setConnected] = useState(false);

  const [url, setUrl] = useStoreState(
    "bridgeProviderUrl",
    "ws://localhost:8080"
  );

  const [connecting, handleConnect] = useHandleProcess(() => {
    return bridge.connect(url);
  }, 500);

  useEffect(() => {
    bridge
      ?.onConnect(() => {
        logger.success(`Connected to the bridge server on ${url}!`);
        setConnected(true);
      })
      .onDisconnect((code, reason) => {
        logger.error(
          "Disconnected from the bridge server! " +
            `${reason || "no reason"} (${code || "unknown"}).`
        );
        setConnected(false);
      })
      .onError((err) => {
        logger.error(`Found error! ${err.message}.`);
        setConnected(false);
      });
  }, [bridge]);

  const validateUrl = () => {
    return url.startsWith("ws://") && url.length > 5;
  };

  const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  if (connected) {
    return null;
  }

  return (
    <Container maxWidth="xs">
      <Box paddingTop={8}>
        <TitledCard title="Connect to the bridge" raised>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="URL"
                value={url}
                onChange={onUrlChange}
                error={!validateUrl()}
                helperText={validateUrl() ? undefined : "Invalid URL!"}
                disabled={connecting}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleConnect}
                disabled={!validateUrl() || connecting}
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
};

export default BridgeConnection;
