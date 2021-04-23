import { NodeHandler, PublisherHandler } from "kumo-client";

import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function usePublisher(
  node: NodeHandler,
  messageType: string,
  topicName: string
): PublisherHandler | null {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node.createPublisher(messageType, topicName).catch((err: Error) => {
      logger.error(`Failed to create a new Publisher! ${err.message}.`);
    });
  });
}

export default usePublisher;
