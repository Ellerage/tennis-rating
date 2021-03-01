import React, { ReactElement } from "react";
import { Box } from "@material-ui/core";
import { ReactComponent as RedZalups } from "./icons/red-zalups.svg";

export const Header = (): ReactElement => {
  return (
    <Box display="flex" justifyContent="center">
      <RedZalups />
    </Box>
  );
};
