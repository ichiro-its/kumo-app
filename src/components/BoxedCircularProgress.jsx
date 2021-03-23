import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

function BoxedCircularProgress() {
  return (
    <Box
      display="flex"
      minHeight={100}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
}

export default BoxedCircularProgress;
