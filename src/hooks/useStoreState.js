import { useState } from "react";
import Store from "store2";

function useStoreState(key, initialValue) {
  const [state, setState] = useState(Store.get(key, initialValue));

  return [
    state,
    (newState) => {
      setState(newState);
      Store.set(key, newState);
    },
  ];
}

export default useStoreState;
