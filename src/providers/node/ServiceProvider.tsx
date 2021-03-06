import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import { ServiceCallback, ServiceHandler } from "kumo-client";

import { useNode } from "./NodeProvider";

const ServiceContext = createContext<ServiceHandler | null>(null);

function useService(): ServiceHandler {
  const service = useContext(ServiceContext);

  if (service === null) {
    throw Error("illegal service provider access");
  }

  return service;
}

interface ServiceProviderProps {
  children: ReactNode | ReactNodeArray;
  serviceType: string;
  serviceName: string;
  callback: ServiceCallback;
}

const ServiceProvider: FunctionComponent<ServiceProviderProps> = ({
  children,
  serviceType,
  serviceName,
  callback,
}: ServiceProviderProps) => {
  const node = useNode();

  const [service, setService] = useState<ServiceHandler | null>(null);

  useEffect(() => {
    node
      .createService(serviceType, serviceName, callback)
      .then((newService: ServiceHandler) => {
        setService(newService);
      });
  }, [node]);

  if (service === null) {
    return null;
  }

  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export {
  ServiceCallback,
  ServiceHandler,
  ServiceProvider,
  ServiceProviderProps,
  useService,
};
