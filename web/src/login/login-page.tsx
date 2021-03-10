import { Box, Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import { ReactElement, useState } from "react";
import React from "react";
import { Header } from "../ui/header";
import { ButtonStyle } from "../ui/button";
export const LoginPage = (): ReactElement => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFocusedPassword, setIsFocusedPassword] = useState(false)
  const [value, setValue] = useState("")
  console.log(value)
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="500px" height="500px" borderRadius="4px" bgcolor="#323232">
        <Box marginTop="30px">
          <Header />
        </Box>
        <Box width="100%" marginTop="16px">
          <ButtonStyle text="Sign in" />
          <ButtonStyle text="Sign up" />
        </Box>
        {/* <form noValidate autoComplete="off"> */}
        <Box flexWrap="wrap" width="340px" marginLeft="50px" >
          <Box height="36px" margin="30px" >
            <TextField
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(event) => setValue(event.target.value)}
              id="filled-basic"
              label="E-mail"
              variant="outlined"
              color={isFocused ? "secondary" : "primary"}
              size="medium"
              style={{ width: "340px", color: "white" }}
              InputProps={{
                style: {
                  color: "white",
                  border: isFocused ? "none" : "1px solid white"
                }
              }}
              InputLabelProps={{
                style: {
                  color: isFocused ? "red" : "white",
                  paddingLeft: "5px",
                  paddingRight: "7px",
                  backgroundColor: "#323232",
                }
              }}
            />
          </Box>

          <Box height="36px" margin="30px" marginTop="50px" >
            <TextField
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
              onChange={(event) => setValue(event.target.value)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color={isFocusedPassword ? "secondary" : "primary"}
              size="medium"
              style={{ width: "340px", color: "white" }}
              InputProps={{
                style: {
                  color: "white",
                  border: isFocusedPassword ? "none" : "1px solid white"
                }
              }}
              InputLabelProps={{
                style: {
                  color: isFocusedPassword ? "red" : "white",
                  paddingLeft: "5px",
                  paddingRight: "7px",
                  backgroundColor: "#323232",
                }
              }}
            />
          </Box>

          <Box display="flex" justifyContent="flex-end" marginRight="-30px" marginTop="80px">
            <Button variant="contained" color="secondary" size="large" >
              LOG IN
            </Button>
          </Box>
        </Box>
        {/* </form> */}
      </Box>
    </Box>
  );
};
