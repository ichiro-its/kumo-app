import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import React, { ReactNode, ReactNodeArray } from "react";

interface Props {
  children: ReactNode | ReactNodeArray;
  title?: "" | string;
  raised?: false | boolean;
  disablePadding?: false | boolean;
}

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

function TitledCard(props: Props) {
  const { children, title, raised, disablePadding } = props;
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
      <CardContent style={{ padding: disablePadding ? 0 : 0 }}>
        {children}
      </CardContent>
    </Card>
  );
}

export default TitledCard;
