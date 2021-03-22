import useLogger from "../useLogger";
import { useNode } from "../useNode";
import useStateOnce from "../useStateOnce";

function useSubscription(messageType, topicName, callback) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node
      .createSubscription(messageType, topicName, callback)
      .catch((err) => {
        logger.error(`Failed to create a new Subscription! ${err.message}`);
      });
  });
}

export default useSubscription;
