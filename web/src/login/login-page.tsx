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
          <ButtonStyle text="Sign in" />
          <ButtonStyle text="Sign up" />
        </Box>
        {/* <form noValidate autoComplete="off"> */}
        <Box flexWrap="wrap" width="340px" marginLeft="50px">
          <Box height="36px" margin="30px">
            <TextField
              id="filled-basic"
              label="E-mail"
              variant="outlined"
              color="secondary"
              size="medium"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box margin="30px" marginTop="50px">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
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
