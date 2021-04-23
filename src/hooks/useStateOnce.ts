import { useState, useEffect } from "react";

type StateOnceCallback<T> = () => T | Promise<T | void> | null;

function useStateOnce<T>(callback: StateOnceCallback<T>): T | null {
  const [state, setState] = useState<T | null>(null);
  const [once, setOnce] = useState<boolean>(false);

  useEffect(() => {
    if (state === null && !once) {
      const result = callback();

      if (result !== null) {
        setOnce(true);
        if (result instanceof Promise) {
          result.then((newResult) => {
            if (newResult) {
              setState(newResult);
            } else {
              setOnce(false);
            }
          });
        } else {
          setState(result);
        }
      }
    }
  });

  return state;
}

export default useStateOnce;
