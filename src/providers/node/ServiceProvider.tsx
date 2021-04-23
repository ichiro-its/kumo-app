import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AsyncServiceCallback,
  ServiceCallback,
  ServiceHandler,
} from "kumo-client";

import { useNode } from "./NodeProvider";

const ServiceContext = createContext<ServiceHandler | null>(null);

function useService(): ServiceHandler | null {
  return useContext(ServiceContext);
}

interface ServiceProviderProps {
  children: ReactNode | ReactNodeArray;
  serviceType: string;
  serviceName: string;
  callback: AsyncServiceCallback | ServiceCallback;
}

const Serviceprovider: FunctionComponent<ServiceProviderProps> = ({
  children,
  serviceType,
  serviceName,
  callback,
}: ServiceProviderProps) => {
  const node = useNode();

  const [service, setService] = useState<ServiceHandler | null>(null);

  useEffect(() => {
    node
      ?.createService(serviceType, serviceName, callback)
      .then((newService: ServiceHandler) => {
        setService(newService);
      });
  }, [node]);

  if (node === null) {
    return null;
  }

  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export { Serviceprovider, ServiceProviderProps, useService };
