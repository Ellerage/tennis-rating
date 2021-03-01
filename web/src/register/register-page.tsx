import React from "react";
import { Box } from "@material-ui/core";
import { Header } from "../ui/header";
import { ButtonStyle } from "../ui/button";

export const RegisterPage = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box height="635px" width="790px" borderRadius="4px" bgcolor="#323232">
        <Box marginTop="30px">
          <Header />
        </Box>
        <Box
          width="100%"
          marginTop="16px"
          bgcolor="#1A1A1A"
          display="flex"
          justifyContent="space-around"
        >
          <ButtonStyle text="Sign in" />
          <ButtonStyle text="Sign up" isActive={true} />
        </Box>
      </Box>
    </Box>
  );
};
