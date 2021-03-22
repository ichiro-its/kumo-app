import useLogger from "../useLogger";
import { useNode } from "../useNode";
import useStateOnce from "../useStateOnce";

function useClient(serviceType, serviceName) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node.createClient(serviceType, serviceName).catch((err) => {
      logger.error(`Failed to create a new Client! ${err.message}`);
    });
  });
}

export default useClient;
