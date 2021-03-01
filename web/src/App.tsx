import React from "react";
import { LoginPage } from "./login/login-page";
import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#323232",
      },
      secondary: {
        main: "#F51010",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <LoginPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
