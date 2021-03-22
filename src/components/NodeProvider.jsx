import PropTypes from "prop-types";
import React from "react";

import BoxedCircularProgress from "./BoxedCircularProgress";
import { NodeContext, useLogger, useSession, useStateOnce } from "../hooks";

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

export default NodeProvider;
