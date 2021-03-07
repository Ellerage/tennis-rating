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
        </Box>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Box display="flex" width="710px" flexWrap="wrap">
            <Box margin="10px">
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                color="secondary"
                style={{ width: "340px", color: "white", marginRight: "5px" }}
              />
              <TextField
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                color="secondary"
                style={{ width: "340px", color: "white", marginLeft: "5px" }}
              />
            </Box>
            <Box margin="10px">
              <TextField
                id="outlined-basic"
                label="Second name"
                variant="outlined"
                color="secondary"
                style={{ width: "340px", color: "white", marginRight: "5px" }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                color="secondary"
                style={{ width: "340px", color: "white", marginLeft: "5px" }}
              />
            </Box>
            <Box margin="10px">
              <TextField
                id="outlined-basic"
                label="Aka"
                variant="outlined"
                color="secondary"
                style={{ width: "340px", color: "white", marginRight: "5px" }}
              />
              <TextField
                id="outlined-basic"
                label="Password confirmation"
                variant="outlined"
                color="secondary"
                style={{ width: "340px", color: "white", marginLeft: "5px" }}
              />
            </Box>
            <Box
              width="700px"
              display="flex"
              justifyContent="flex-end"
              marginTop="20px"
            >
              <Button variant="contained" color="secondary" size="large">
                LOG IN
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
