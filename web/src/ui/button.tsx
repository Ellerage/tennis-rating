import React, { ReactElement } from "react";
import { ButtonBase, BoxProps } from "@material-ui/core";

interface Props {
  text: string;
  props?: BoxProps;
}
export const ButtonStyle = ({ text, props }: Props): ReactElement => {
  return (
    <ButtonBase
      {...props}
      style={{
        width: "250px",
        height: "48px",
        color: "white",
        fontSize: "16px",
        background: "#1A1A1A",
      }}
    >
      {text}
    </ButtonBase>
  );
};
