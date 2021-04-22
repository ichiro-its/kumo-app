import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

const usePublisher: (
  node: any,
  messageType: string,
  topicName: string
) => any = (node, messageType, topicName) => {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node.createPublisher(messageType, topicName).catch((err: Error) => {
      logger.error(`Failed to create a new Publisher! ${err.message}.`);
    });
  });
};

export default usePublisher;
