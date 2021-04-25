import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";

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

interface TitledCardProps {
  children: ReactNode | ReactNodeArray;
  title: string;
  raised?: boolean;
  disablePadding?: boolean;
}

const TitledCard: FunctionComponent<TitledCardProps> = ({
  children,
  title,
  raised,
  disablePadding,
}: TitledCardProps) => {
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
      <CardContent style={{ padding: disablePadding ? 0 : undefined }}>
        {children}
      </CardContent>
    </Card>
  );
};

TitledCard.defaultProps = {
  raised: false,
  disablePadding: false,
};

export { TitledCard, TitledCardProps };
