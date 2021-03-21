import { Box, Container, Grid } from "@material-ui/core";
import React from "react";

import {
  LoggerProvider,
  SessionProvider,
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
              <Grid item sm={6} xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <SimplePublisherNode />
                  </Grid>
                  <Grid item xs={12}>
                    <SimpleSubscriptionNode />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={6} xs={12}>
                <SimpleServiceNode />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SessionProvider>
    </LoggerProvider>
  );
}

export default App;
