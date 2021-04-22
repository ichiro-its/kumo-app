import { SnackbarProvider } from "notistack";
import React, { ReactNode, ReactNodeArray } from "react";

interface Props {
  children: ReactNode | ReactNodeArray;
}

const LoggerProvider = (props: Props) => {
  const { children } = props;
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default LoggerProvider;
