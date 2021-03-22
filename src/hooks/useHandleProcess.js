import { useState } from "react";

function useHandleProcess(process) {
  const [processing, setProcessing] = useState(false);

  const handleProcess = () => {
    const result = process();
    if (result instanceof Promise) {
      setProcessing(true);
      result.finally(() => {
        setProcessing(false);
      });
    }

    return result;
  };

  return [processing, handleProcess];
}

export default useHandleProcess;
