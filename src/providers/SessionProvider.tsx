import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import { SessionHandler } from "kumo-client";

import { useBridge } from "./BridgeProvider";

const SessionContext = createContext<SessionHandler | null>(null);

function useSession(): SessionHandler | null {
  return useContext(SessionContext);
}

interface SessionProviderProps {
  children: ReactNode | ReactNodeArray;
}

const SessionProvider: FunctionComponent<SessionProviderProps> = ({
  children,
}: SessionProviderProps) => {
  const bridge = useBridge();

  const [session, setSession] = useState<SessionHandler | null>(null);

  useEffect(() => {
    bridge?.onConnect((newSession: SessionHandler) => {
      setSession(newSession);
    });
  }, [bridge]);

  if (bridge === null) {
    return null;
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionProviderProps, useSession };
