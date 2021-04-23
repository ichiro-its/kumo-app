import { ClientHandler, NodeHandler } from "kumo-client";

import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function useClient(
  node: NodeHandler | null,
  serviceType: string,
  serviceName: string
): ClientHandler | null {
  const logger = useLogger();

  return useStateOnce<ClientHandler>(() => {
    if (node === null) {
      return null;
    }

    return node.createClient(serviceType, serviceName).catch((err: Error) => {
      logger.error(`Failed to create a new Client! ${err.message}.`);
    });
  });
}

export default useClient;
