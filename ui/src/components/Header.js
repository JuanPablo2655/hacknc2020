import React from "react";

import Signin from "./Signin";
import Signup from "./Signup";

const Header = ( {onSignin}) => {
  return (
    <header>
      <Signup/>
      <Signin onSignin={onSignin} />
    </header>
  );
};

export default Header;
