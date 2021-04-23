import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from "react";

import { NodeHandler } from "kumo-client";

import { useSession } from "../SessionProvider";

const NodeContext = createContext<NodeHandler | null>(null);

function useNode(): NodeHandler {
  const node = useContext(NodeContext);

  if (node === null) {
    throw Error("illegal node provider access");
  }

  return node;
}

interface NodeProviderProps {
  children: ReactNode | ReactNodeArray;
  nodeName: string;
}

const NodeProvider: FunctionComponent<NodeProviderProps> = ({
  children,
  nodeName,
}: NodeProviderProps) => {
  const session = useSession();

  const [node, setNode] = useState<NodeHandler | null>(null);

  useEffect(() => {
    session.createNode(nodeName).then((newNode: NodeHandler) => {
      setNode(newNode);
    });
  }, [session]);

  if (node === null) {
    return null;
  }

  return <NodeContext.Provider value={node}>{children}</NodeContext.Provider>;
};

export { NodeHandler, NodeProvider, NodeProviderProps, useNode };
