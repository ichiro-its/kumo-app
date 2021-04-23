import { SnackbarProvider, useSnackbar } from "notistack";
import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";

interface LoggerProviderProps {
  children: ReactNode | ReactNodeArray;
}

const LoggerProvider: FunctionComponent<LoggerProviderProps> = ({
  children,
}: LoggerProviderProps) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

interface Logger {
  success: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

function useLogger(): Logger {
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
}

export { Logger, LoggerProvider, LoggerProviderProps, useLogger };
