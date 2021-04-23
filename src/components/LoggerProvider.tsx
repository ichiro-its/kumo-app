import { SnackbarProvider } from "notistack";
import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";

interface Props {
  children: ReactNode | ReactNodeArray;
}

const LoggerProvider: FunctionComponent<Props> = ({ children }: Props) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default LoggerProvider;
