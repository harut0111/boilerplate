import { HOME_PATH, LOGIN_PATH } from "./constants";
import Home from "../components/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import React from "react";

const Routes = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path={HOME_PATH} exact component={Home} />
          <Route path={LOGIN_PATH} component={Login} />
          <Redirect to={LOGIN_PATH} />
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default Routes;
