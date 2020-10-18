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
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const setEmailHander = (event) => {
    setinputEmail(event.target.value);
    event.preventDefault();
  }
  const setPasswordHander = (event) => {
    setinputPassword(event.target.value);
    event.preventDefault();
  }
  const afterOpenModal = (event) => {
    event.preventDefault();
    login(inputEmail, inputPassword).then(() => setIsOpen(false))
  };
  return (
    <div>
      <button onClick={openModal} className="sign-in-btn">Sign In</button>
      <Modal
        isOpen={modalIsOpen}
        onAfteropen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <h2>Sign In</h2>
        <form onSubmit={afterOpenModal}>
          <input
            onChange={setEmailHander}
            type="text"
            placeholder="Email"
            name="Username"
          />
          <br></br>
          <input
            onChange={setPasswordHander}
            type="password"
            placeholder="Password"
            name="Password"
          />
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default Signin;
