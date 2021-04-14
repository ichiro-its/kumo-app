import { Box, Container, Grid } from "@material-ui/core";
import { LoggerProvider, SessionProvider } from "kumo-app";
import React from "react";

import {
  SimpleClientNode,
  SimplePublisherNode,
  SimpleServiceNode,
  SimpleSubscriptionNode,
} from "./components";

function App() {
  return (
    <LoggerProvider>
      <SessionProvider>
        <Box margin={4}>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item md={6} sm={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <SimplePublisherNode />
                  </Grid>
                  <Grid item xs={12}>
                    <SimpleSubscriptionNode />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} sm={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <SimpleClientNode />
                  </Grid>
                  <Grid item xs={12}>
                    <SimpleServiceNode />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SessionProvider>
    </LoggerProvider>
  );
}

export default App;
