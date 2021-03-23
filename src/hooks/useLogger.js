import { useSnackbar } from "notistack";

function useLogger() {
  const snackbar = useSnackbar();

  return {
    success: (message) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "success" });
      }
    },
    info: (message) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "info" });
      }
    },
    debug: (message) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message);
      }
    },
    warn: (message) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "warning" });
      }
    },
    error: (message) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message, { variant: "error" });
      }
    },
  };
}

export default useLogger;
