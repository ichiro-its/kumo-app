import { Box, Container, Grid } from "@material-ui/core";

import {
  BridgeProvider,
  BridgeConnection,
  LoggerProvider,
  SessionProvider,
} from "kumo-app";

import React from "react";

import {
  SimpleClient,
  SimplePublisher,
  SimpleService,
  SimpleSubscription,
} from "./components";

function App() {
  return (
    <LoggerProvider>
      <BridgeProvider>
        <BridgeConnection />
        <SessionProvider>
          <Box margin={4}>
            <Container maxWidth="md">
              <Grid container spacing={4}>
                <Grid item md={6} sm={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <SimplePublisher />
                    </Grid>
                    <Grid item xs={12}>
                      <SimpleSubscription />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <SimpleClient />
                    </Grid>
                    <Grid item xs={12}>
                      <SimpleService />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </SessionProvider>
      </BridgeProvider>
    </LoggerProvider>
  );
}

export default App;
