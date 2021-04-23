import {
  AsyncSubscriptionCallback,
  NodeHandler,
  SubscriptionCallback,
  SubscriptionHandler,
} from "kumo-client";

import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function useSubscription(
  node: NodeHandler,
  messageType: string,
  topicName: string,
  callback: SubscriptionCallback | AsyncSubscriptionCallback
): SubscriptionHandler | null {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node
      .createSubscription(messageType, topicName, callback)
      .catch((err: Error) => {
        logger.error(`Failed to create a new Subscription! ${err.message}.`);
      });
  });
}

export default useSubscription;
