import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import { ClientHandler } from "kumo-client";

import { useNode } from "./NodeProvider";

const ClientContext = createContext<ClientHandler | null>(null);

function useClient(): ClientHandler {
  const client = useContext(ClientContext);

  if (client === null) {
    throw Error("illegal client provider access");
  }

  return client;
}

interface ClientProviderProps {
  children: ReactNode | ReactNodeArray;
  serviceType: string;
  serviceName: string;
}

const ClientProvider: FunctionComponent<ClientProviderProps> = ({
  children,
  serviceType,
  serviceName,
}: ClientProviderProps) => {
  const node = useNode();

  const [client, setClient] = useState<ClientHandler | null>(null);

  useEffect(() => {
    node
      .createClient(serviceType, serviceName)
      .then((newClient: ClientHandler) => {
        setClient(newClient);
      });
  }, [node]);

  if (client === null) {
    return null;
  }

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

export { ClientHandler, ClientProvider, ClientProviderProps, useClient };
