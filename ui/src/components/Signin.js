import React, { useState } from "react";
import Modal from "react-modal";
import { login } from "../utils";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Signin = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const input_handler = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [failure_reason, set_failure_reason] = useState(null);
  const onSignin = (event) => {
    event.preventDefault();
    login(inputState.username, inputState.password).then((answer) => {
      if (answer === "BadUsernameOrPassword") {
        set_failure_reason(answer);
      } else {
        setIsOpen(false);
      }
    });
  };
  return (
    <div className="sign-btn-container">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="sign-in-btn"
      >
        Sign In
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={() => setIsOpen(false)}>close</button>
        {failure_reason && <div>{failure_reason}</div>}
        <h2>Sign In</h2>
        <form onSubmit={onSignin}>
          <input
            onChange={input_handler}
            type="text"
            placeholder="Email"
            name="email"
            value={inputState.email}
          />
          <br></br>
          <input
            onChange={input_handler}
            type="password"
            placeholder="Password"
            name="password"
            value={inputState.password}
          />
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default Signin;
