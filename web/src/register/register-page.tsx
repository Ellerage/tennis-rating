import React from "react";
import { Box, TextField, Button } from "@material-ui/core";
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
          <Box position="absolute" top="280px">
            <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
            <TextField
              id="outlined-basic"
              label="second name"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box position="absolute" top="380px">
            <TextField
              id="outlined-basic"
              label="123"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
            <TextField
              id="outlined-basic"
              label="1234"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box position="absolute" top="480px">
            <TextField
              id="outlined-basic"
              label="13254"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
            <TextField
              id="outlined-basic"
              label="123123"
              variant="outlined"
              color="secondary"
              style={{ width: "340px", color: "white" }}
            />
          </Box>
          <Box position="relative" top="580px" left="110px">
            <Button variant="contained" color="secondary" size="large">
              LOG IN
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
