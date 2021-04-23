import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import { Bridge } from "kumo-client";
import { useStoreState } from "../hooks";

const BridgeContext = createContext<Bridge | null>(null);

function useBridge(): Bridge | null {
  return useContext(BridgeContext);
}

interface BridgeProviderProps {
  children: ReactNode | ReactNodeArray;
  url: string | undefined;
}

const BridgeProvider: FunctionComponent<BridgeProviderProps> = ({
  children,
  url,
}: BridgeProviderProps) => {
  const [bridge] = useState(() => new Bridge());

  const [bridgeUrl] = useStoreState(
    "bridgeProviderUrl",
    url ?? "ws://localhost:8080"
  );

  useEffect(() => {
    bridge.connect(bridgeUrl);
  }, [bridgeUrl]);

  return (
    <BridgeContext.Provider value={bridge}>{children}</BridgeContext.Provider>
  );
};

export { Bridge, BridgeProvider, BridgeProviderProps, useBridge };
