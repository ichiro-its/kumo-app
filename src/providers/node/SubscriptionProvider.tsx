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
  AsyncSubscriptionCallback,
  SubscriptionCallback,
  SubscriptionHandler,
} from "kumo-client";

import { useNode } from "./NodeProvider";

const SubscriptionContext = createContext<SubscriptionHandler | null>(null);

function useSubscription(): SubscriptionHandler | null {
  return useContext(SubscriptionContext);
}

interface SubscriptionProviderProps {
  children: ReactNode | ReactNodeArray;
  messageType: string;
  topicName: string;
  callback: AsyncSubscriptionCallback | SubscriptionCallback;
}

const SubscriptionProvider: FunctionComponent<SubscriptionProviderProps> = ({
  children,
  messageType,
  topicName,
  callback,
}: SubscriptionProviderProps) => {
  const node = useNode();

  const [subscription, setSubscription] = useState<SubscriptionHandler | null>(
    null
  );

  useEffect(() => {
    node
      ?.createSubscription(messageType, topicName, callback)
      .then((newSubscription: SubscriptionHandler) => {
        setSubscription(newSubscription);
      });
  }, [node]);

  if (node === null || subscription === null) {
    return null;
  }

  return (
    <SubscriptionContext.Provider value={subscription}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export {
  AsyncSubscriptionCallback,
  SubscriptionCallback,
  SubscriptionHandler,
  SubscriptionProvider,
  SubscriptionProviderProps,
  useSubscription,
};
