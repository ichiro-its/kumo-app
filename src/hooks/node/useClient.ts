import useLogger from "../useLogger";
import useStateOnce from "../useStateOnce";

const useClient: (
  node: any | undefined,
  serviceType: string,
  serviceName: string
) => any = (node, serviceType, serviceName) => {
  const logger = useLogger();

  return useStateOnce(() => {
    if (node === null) {
      return null;
    }

    return node.createClient(serviceType, serviceName).catch((err: Error) => {
      logger.error(`Failed to create a new Client! ${err.message}.`);
    });
  });
};

export default useClient;
