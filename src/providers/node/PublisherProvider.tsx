import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import { PublisherHandler } from "kumo-client";

import { useNode } from "./NodeProvider";

const PublisherContext = createContext<PublisherHandler | null>(null);

function usePublisher(): PublisherHandler | null {
  return useContext(PublisherContext);
}

interface PublisherProviderProps {
  children: ReactNode | ReactNodeArray;
  messageType: string;
  topicName: string;
}

const PublisherProvider: FunctionComponent<PublisherProviderProps> = ({
  children,
  messageType,
  topicName,
}: PublisherProviderProps) => {
  const node = useNode();

  const [publisher, setPublisher] = useState<PublisherHandler | null>(null);

  useEffect(() => {
    node
      ?.createPublisher(messageType, topicName)
      .then((newPublisher: PublisherHandler) => {
        setPublisher(newPublisher);
      });
  }, [node]);

  if (node === null) {
    return null;
  }

  return (
    <PublisherContext.Provider value={publisher}>
      {children}
    </PublisherContext.Provider>
  );
};

export { PublisherProvider, PublisherProviderProps, usePublisher };
