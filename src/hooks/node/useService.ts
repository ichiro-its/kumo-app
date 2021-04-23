import {
  AsyncServiceCallback,
  NodeHandler,
  ServiceCallback,
  ServiceHandler,
} from "kumo-client";

import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function useService(
  node: NodeHandler,
  serviceType: string,
  serviceName: string,
  callback: ServiceCallback | AsyncServiceCallback
): ServiceHandler | null {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node
      .createService(serviceType, serviceName, callback)
      .catch((err: Error) => {
        logger.error(`Failed to create a new Service! ${err.message}.`);
      });
  });
}

export default useService;
