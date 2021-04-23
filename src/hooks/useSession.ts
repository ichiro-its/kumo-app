import { createContext, useContext } from "react";
import { SessionHandler } from "kumo-client";

const SessionContext = createContext<SessionHandler | null>(null);

function useSession(): SessionHandler | null {
  return useContext(SessionContext);
}

export { SessionContext, useSession };
