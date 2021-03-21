import { SnackbarProvider, useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";

export function useLogger() {
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

function LoggerProvider({ children }) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}

LoggerProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { LoggerProvider };
