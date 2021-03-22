import useLogger from "../useLogger";
import { useNode } from "../useNode";
import useStateOnce from "../useStateOnce";

function usePublisher(messageType, topicName) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node.createPublisher(messageType, topicName).catch((err) => {
      logger.error(`Failed to create a new Publisher! ${err.message}`);
    });
  });
}

export default usePublisher;
