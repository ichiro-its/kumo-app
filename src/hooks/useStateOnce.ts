import { useState, useEffect } from "react";

const useStateOnce: (callback: any | undefined) => any = (callback) => {
  const [state, setState] = useState<any>(null);
  const [once, setOnce] = useState<boolean>(false);

  useEffect(() => {
    if (state === null && !once) {
      const result = callback();

      if (result !== null) {
        setOnce(true);
        if (result instanceof Promise) {
          result.then((newResult) => {
            setState(newResult);
          });
        } else {
          setState(result);
        }
      }
    }
  });

  return state;
};

export default useStateOnce;
