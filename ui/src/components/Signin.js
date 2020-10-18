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

const Signin = ({login}) => {
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setinputEmail("")
    setinputPassword("")
  };
  const afterOpenModal = (event) => {
    event.preventDefault();
    if (event.target.name === "Username") {
      setinputEmail(event.target.value);
    } else {
      setinputPassword(event.target.value);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    login(inputEmail, inputPassword).then(console.log)
  };
  const validateForm = () => {
    return (
      inputEmail.includes("@") &&
      inputEmail.length > 0 &&
      inputPassword.length > 0 
      )
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
        <form>
          <input
            onChange={afterOpenModal}
            type="text"
            placeholder="Email"
            name="Username"
          />
          <br></br>
          <input
            onChange={afterOpenModal}
            type="password"
            placeholder="Password"
            name="Password"
          />
          <br></br>
          <input disabled={!validateForm()} onClick={submitHandler} type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default Signin;
