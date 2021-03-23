import { useState, useEffect } from "react";

function useStateOnce(callback) {
  const [state, setState] = useState(null);
  const [once, setOnce] = useState(false);

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
}

export default useStateOnce;
