import { useSnackbar } from "notistack";

const useLogger = () => {
  const snackbar = useSnackbar();

  return {
    success: (message: string) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "success" });
      }
    },
    info: (message: string) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "info" });
      }
    },
    debug: (message: string) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message);
      }
    },
    warn: (message: string) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "warning" });
      }
    },
    error: (message: string) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "error" });
      }
    },
  };
};

export default useLogger;
