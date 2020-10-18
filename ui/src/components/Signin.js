import React, { useState } from "react";
import Modal from "react-modal";

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
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const afterOpenModal = (event) => {
    console.log(event.target.value);
    setInputUsername(event.target.value);
    setinputEmail(event.target.value);
    event.preventDefault();
  };
  return (
    <div>
      <button onClick={openModal}>Sign In</button>
      <Modal
        isOpen={modalIsOpen}
        onAfteropen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <h2>Sign In</h2>
        <form>
          <input
            onChange={afterOpenModal}
            type="text"
            placeholder="Username/Email"
          />
          <br></br>
          <input
            onChange={afterOpenModal}
            type="password"
            placeholder="Password"
          />
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default Signin;
