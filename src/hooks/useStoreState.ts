import { useState } from "react";
import Store from "store2";

const useStoreState: (key: any, initialValue: any) => any = (
  key,
  initialValue
) => {
  const [state, setState] = useState(Store.get(key, initialValue));

  return [
    state,
    (newState: any) => {
      setState(newState);
      Store.set(key, newState);
    },
  ];
};

export default useStoreState;
