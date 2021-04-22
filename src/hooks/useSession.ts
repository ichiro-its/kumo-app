import { createContext, useContext } from "react";
import { SessionHandler } from "kumo-client";

const SessionContext = createContext(new SessionHandler(null));

const useSession = () => {
  return useContext(SessionContext);
};

export { SessionContext, useSession };
