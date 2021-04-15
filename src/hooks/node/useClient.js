import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function useClient(node, serviceType, serviceName) {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node.createClient(serviceType, serviceName).catch((err) => {
      logger.error(`Failed to create a new Client! ${err.message}.`);
    });
  });
}

export default useClient;
