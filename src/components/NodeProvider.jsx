import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

import BoxedCircularProgress from "./BoxedCircularProgress";
import { useLogger } from "./LoggerProvider";
import { useSession } from "./SessionProvider";

const NodeContext = createContext(null);

function useStateOnce(callback) {
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (result === null && !processing) {
      const callbackResult = callback();
      if (callbackResult instanceof Promise) {
        setProcessing(true);
        callbackResult
          .then((newResult) => {
            setResult(newResult);
          })
          .finally(() => {
            setProcessing(false);
          });
      } else {
        setResult(callbackResult);
      }
    }
  });

  return result;
}

function useNode() {
  return useContext(NodeContext);
}

function usePublisher(messageType, topicName) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node.createPublisher(messageType, topicName).catch((err) => {
      logger.error(`Failed to create a new Publisher! ${err.message}`);
    });
  });
}

function useSubscription(messageType, topicName, callback) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node
      .createSubscription(messageType, topicName, callback)
      .catch((err) => {
        logger.error(`Failed to create a new Subscription! ${err.message}`);
      });
  });
}

function useClient(serviceType, serviceName) {
  const node = useNode();
  const logger = useLogger();

  return useStateOnce(() => {
    return node.createClient(serviceType, serviceName).catch((err) => {
      logger.error(`Failed to create a new Client! ${err.message}`);
    });
  });
}

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

function NodeProvider({ children, nodeName }) {
  const logger = useLogger();
  const session = useSession();

  const node = useStateOnce(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await session.createNode(nodeName);
    } catch (err) {
      logger.error(`Failed to create a Node! ${err.messsage}`);
      throw err;
    }
  });

  if (node === null) {
    return <BoxedCircularProgress />;
  }

  return <NodeContext.Provider value={node}>{children}</NodeContext.Provider>;
}

NodeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  nodeName: PropTypes.string.isRequired,
};

export {
  NodeProvider,
  useClient,
  useNode,
  usePublisher,
  useService,
  useSubscription,
};
