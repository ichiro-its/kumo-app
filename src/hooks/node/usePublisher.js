import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function usePublisher(node, messageType, topicName) {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node.createPublisher(messageType, topicName).catch((err) => {
      logger.error(`Failed to create a new Publisher! ${err.message}.`);
    });
  });
}

export default usePublisher;
