import React from "react";

import Signin from "./Signin";
import Signup from "./Signup";

const Header = () => {
  return (
    <header>
      <Signup/>
      <Signin/>
    </header>
  );
};

export default Header;
