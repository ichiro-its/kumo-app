import { Box, Container, Grid } from "@material-ui/core";
import React from "react";

import {
  LoggerProvider,
  SessionProvider,
  SimplePublisher,
  SimpleSubscription,
} from "./components";

function App() {
  return (
    <LoggerProvider>
      <SessionProvider>
        <Box margin={4}>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item sm={6} xs={12}>
                <SimplePublisher />
              </Grid>
              <Grid item sm={6} xs={12}>
                <SimpleSubscription />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SessionProvider>
    </LoggerProvider>
  );
}

export default App;
