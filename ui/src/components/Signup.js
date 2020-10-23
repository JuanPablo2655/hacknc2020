import React, { useState } from "react";
import Modal from "react-modal";
import { signup } from "../utils";

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

const Signup = () => {
  const [inputState, setInputState] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    sign_up_token: "",
  });
  const inputHandler = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  const onSignup = (event) => {
    event.preventDefault();
    if (inputState.password !== inputState.confirm_password) {
    } else {
      return signup(
        inputState.username,
        inputState.email,
        inputState.password,
        inputState.sign_up_token
      ).then(() => setIsOpen(false));
    }
  };
  return (
    <div className="sign-btn-container">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="sign-up-btn"
      >
        Sign Up
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          close
        </button>
        <h2>Sign Up</h2>
        <form onSubmit={onSignup} className="sign-up">
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Username"
            name="username"
            value={inputState.username}
          />
          <br></br>
          <input
            onChange={inputHandler}
            type="email"
            placeholder="Email"
            name="email"
            value={inputState.email}
          />
          <br></br>
          <input
            onChange={inputHandler}
            type="password"
            placeholder="Password"
            name="password"
            value={inputState.password}
          />
          <br></br>
          <input
            onChange={inputHandler}
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            value={inputState.confirm_password}
          />
          <br></br>
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Sign Up Token"
            name="sign_up_token"
            value={inputState.sign_up_token}
          />
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default Signup;
