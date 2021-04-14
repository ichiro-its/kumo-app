import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

function useService(node, serviceType, serviceName, callback) {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node
      .createService(serviceType, serviceName, callback)
      .catch((err) => {
        logger.error(`Failed to create a new Service! ${err.message}.`);
      });
  });
}

export default useService;
