import { Box, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useLogger } from "./LoggerProvider";
import { useSession } from "./SessionProvider";

const NodeContext = createContext(null);

const useNode = () => {
  return useContext(NodeContext);
};

function NodeProvider({ children, nodeName }) {
  const logger = useLogger();
  const session = useSession();

  const [node, setNode] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (node === null && !creating) {
      setCreating(true);
      setTimeout(() => {
        session
          .createNode(nodeName)
          .then((newNode) => {
            logger.success(`Node ${nodeName} created!`);
            setNode(newNode);
          })
          .catch((err) => {
            logger.error(`Failed to create ${nodeName}! ${err.messsage}`);
          })
          .finally(() => {
            setCreating(false);
          });
      }, 500);
    }
  });

  if (node === null) {
    return (
      <Box
        display="flex"
        minHeight={100}
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
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

export { NodeProvider, useNode };
