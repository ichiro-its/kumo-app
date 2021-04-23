import { Dispatch, useState } from "react";
import Store from "store2";

function useStoreState<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<T>] {
  const [state, setState] = useState<T>(() => Store.get(key, initialValue));

  return [
    state,
    (newState: T) => {
      setState(newState);
      Store.set(key, newState);
    },
  ];
}

export default useStoreState;
