import useLogger from "../useLogger";
import { useSession } from "../useSession";
import useStateOnce from "../useStateOnce";

const useNode: (nodeName: string) => any = (nodeName) => {
  const logger = useLogger();
  const session = useSession();

  return useStateOnce(() => {
    if (session === null) {
      return null;
    }

    return session.createNode(nodeName).catch((err: Error) => {
      logger.error(`Failed to create a Node! ${err.message}.`);
    });
  });
};

export default useNode;