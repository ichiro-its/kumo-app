import { useState } from "react";

function useHandleProcess(process, delay) {
  const [processing, setProcessing] = useState(false);

  const handleProcess = () => {
    if (delay === undefined) {
      const result = process();
      if (result instanceof Promise) {
        setProcessing(true);
        result.finally(() => {
          setProcessing(false);
        });
      }
    } else {
      setProcessing(true);
      setTimeout(async () => {
        await process();
        setProcessing(false);
      }, delay);
    }
  };

  return [processing, handleProcess];
}

export default useHandleProcess;
