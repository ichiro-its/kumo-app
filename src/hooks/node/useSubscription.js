import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function useSubscription(node, messageType, topicName, callback) {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node
      .createSubscription(messageType, topicName, callback)
      .catch((err) => {
        logger.error(`Failed to create a new Subscription! ${err.message}.`);
      });
  });
}

export default useSubscription;
