import { SnackbarProvider } from "notistack";
import PropTypes from "prop-types";
import React from "react";

function LoggerProvider({ children }) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}

LoggerProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LoggerProvider;
