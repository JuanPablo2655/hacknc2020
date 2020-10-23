import React, { useState } from "react";

import Signin from "./Signin";
import Signup from "./Signup";
import DirectFactCreationModal from "./DirectFactCreationModal";

const Header = ({ onSignin }) => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <header>
        <button onClick={() => setIsOpen(true)}>Upload Fact</button>
        <div className="sign-btns-container">
          <Signup />
          <Signin onSignin={onSignin} />
        </div>
      </header>
      <DirectFactCreationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </React.Fragment>
  );
};

export default Header;
