import React from "react";
import { Link } from "react-router-dom";
import { IS_LOGGED_IN, LOGIN_PATH } from "../../configs/constants";

const Header = () => {
  return (
    <div className="home-header">
      <Link
        to={LOGIN_PATH}
        onClick={() => localStorage.removeItem(IS_LOGGED_IN)}
      >
        Exit
      </Link>
    </div>
  );
};

export default Header;
