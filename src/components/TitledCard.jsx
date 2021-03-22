import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    headerRoot: {
      backgroundColor: theme.palette.primary.main,
    },
    headerTitle: {
      color: theme.palette.common.white,
    },
  };
});

function TitledCard({ children, title, raised }) {
  const classes = useStyles();

  return (
    <Card raised={raised}>
      <CardHeader
        title={title}
        classes={{
          root: classes.headerRoot,
          title: classes.headerTitle,
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

TitledCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  raised: PropTypes.bool,
};

TitledCard.defaultProps = {
  title: "",
  raised: false,
};

export default TitledCard;
