import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { rootRoutes } from "./routes";
import { LoginPage } from "../login/login-page";
import { RegisterPage } from "../register/register-page";

export const AppRouter: React.FC = (): React.ReactElement => {
  return (
    <Router>
      <Route path={rootRoutes.root}></Route>

      <Route path={rootRoutes.login}>
        <LoginPage />
      </Route>
      <Route path={rootRoutes.register}>
        <RegisterPage />
      </Route>
    </Router>
  );
};

export default AppRouter;
