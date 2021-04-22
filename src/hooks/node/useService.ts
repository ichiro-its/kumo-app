import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

const useService: (
  node: any,
  serviceType: string,
  serviceName: string,
  callback: () => void
) => any = (node, serviceType, serviceName, callback) => {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node
      .createService(serviceType, serviceName, callback)
      .catch((err: any) => {
        logger.error(`Failed to create a new Service! ${err.message}.`);
      });
  });
};

export default useService;
