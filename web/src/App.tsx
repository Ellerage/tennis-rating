import React from "react";
import { LoginPage } from "./login/login-page";
import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { AppRouter } from "./route/app-router";
import { RegisterPage } from "./register/register-page";
import { NewGame } from "./ui/new-game";
import { Ranking } from "./ranking/ranking";
import { MatchHistory } from "./match-history/match-history";
import { Profile } from "./profile/profile";

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
        {/* <LoginPage /> */}

        {/* <Ranking /> */}
        {/* <AppRouter /> */}
        {/* <RegisterPage /> */}
        {/* <NewGame /> */}
        {/* </AppRouter> */}
        {/* <Profile /> */}
        <MatchHistory />
      </div>
    </ThemeProvider>
  );
}

export default App;
