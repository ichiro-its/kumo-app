import { Container } from "@material-ui/core";
import React from "react";

import { SessionProvider } from "./components/SessionProvider";
import { LoggerProvider } from "./components/LoggerProvider";
import SimpleSubscription from "./components/SimpleSubscription";

function App() {
  return (
    <LoggerProvider>
      <SessionProvider>
        <Container maxWidth="xs">
          <SimpleSubscription />
        </Container>
      </SessionProvider>
    </LoggerProvider>
  );
}

export default App;
