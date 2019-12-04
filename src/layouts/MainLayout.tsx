import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { IS_LOGGED_IN, LOGIN_PATH, HOME_PATH } from "../configs/constants";
import { withRouter } from "react-router";

const MainLayout = ({ children }: any) => {
  const history = useHistory();
  const memorizedCallBack = useCallback(() => {
    if (localStorage.getItem(IS_LOGGED_IN)) {
      history.push(HOME_PATH);
    } else {
      history.push(LOGIN_PATH);
    }
  }, [history]);

  useEffect(() => {
    memorizedCallBack();
  }, [memorizedCallBack]);

  return <div className="App">{children}</div>;
};

export default withRouter(MainLayout);
