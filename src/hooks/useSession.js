import { createContext, useContext } from "react";

const SessionContext = createContext(null);

const useSession = () => {
  return useContext(SessionContext);
};

export { SessionContext, useSession };
