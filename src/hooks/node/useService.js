import useLogger from "../useLogger";
import { useNode } from "../useNode";
import useStateOnce from "../useStateOnce";

function useService(serviceType, serviceName, callback) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node
      .createService(serviceType, serviceName, callback)
      .catch((err) => {
        logger.error(`Failed to create a new Service! ${err.message}`);
      });
  });
}

export default useService;
