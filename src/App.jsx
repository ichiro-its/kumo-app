import React from "react";

import ContextProvider from "./components/ContextProvider";
import { LoggerProvider } from "./components/LoggerProvider";

function App() {
  return (
    <LoggerProvider>
      <ContextProvider>
        <div>Hello World</div>
      </ContextProvider>
    </LoggerProvider>
  );
}

export default App;
