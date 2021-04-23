import { useState } from "react";
import Store from "store2";

type StoreStateDispatch<T> = (newState: T) => void;

function useStoreState<T>(
  key: string,
  initialValue: T
): [T, StoreStateDispatch<T>] {
  const [state, setState] = useState(Store.get(key, initialValue));

  return [
    state,
    (newState: T) => {
      setState(newState);
      Store.set(key, newState);
    },
  ];
}

export default useStoreState;
