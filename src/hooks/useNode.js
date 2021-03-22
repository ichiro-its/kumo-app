import { createContext, useContext } from "react";

const NodeContext = createContext(null);

const useNode = () => {
  return useContext(NodeContext);
};

export { NodeContext, useNode };
