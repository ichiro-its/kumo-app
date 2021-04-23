import { useState } from "react";

function useHandleProcess(
  process: () => void | Promise<void>,
  delay: number
): [boolean, () => void] {
  const [processing, setProcessing] = useState<boolean>(false);

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
