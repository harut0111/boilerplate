import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IS_LOGGED_IN, LOGIN_PATH, HOME_PATH } from "../configs/constants";
import { withRouter } from "react-router";

const MainLayout = ({ children }: any) => {
    const history = useHistory();
    useEffect(() => {

        if (localStorage.getItem(IS_LOGGED_IN)) {
            history.push(HOME_PATH);
        } else {
            history.push(LOGIN_PATH);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            {children}
        </div>
    )
};

export default withRouter(MainLayout);
