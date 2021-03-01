import { Box, TextField, Button, ButtonBase } from "@material-ui/core";
import { ReactElement } from "react";
import React from "react";
import { Header } from "../ui/header";
import { ButtonStyle } from "../ui/button";
export const LoginPage = (): ReactElement => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="500px" height="564px" borderRadius="4px" bgcolor="#323232">
        <Box marginTop="30px">
          <Header />
        </Box>
        <Box width="100%" marginTop="16px">
          <ButtonStyle text="Sign in" border="1px solid" />
          <ButtonStyle text="Sign up" />
        </Box>
        {/* <form noValidate autoComplete="off"> */}
        <Box width="500px" display="flex" justifyContent="center">
          <Box position="absolute" top="390px" height="36px">
            <TextField
              id="filled-basic"
              label="E-mail"
              variant="outlined"
              color="secondary"
              size="medium"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box position="absolute" top="480px">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box position="relative" top="300px" left="110px">
            <Button variant="contained" color="secondary" size="large">
              LOG IN
            </Button>
          </Box>
        </Box>
        {/* </form> */}
      </Box>
    </Box>
  );
};
