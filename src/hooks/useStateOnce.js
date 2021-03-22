import { useState, useEffect } from "react";

function useStateOnce(callback) {
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (result === null && !processing) {
      const callbackResult = callback();
      if (callbackResult instanceof Promise) {
        setProcessing(true);
        callbackResult
          .then((newResult) => {
            setResult(newResult);
          })
          .finally(() => {
            setProcessing(false);
          });
      } else {
        setResult(callbackResult);
      }
    }
  });

  return result;
}

export default useStateOnce;
