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

const Signup = ({signup}) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [inputConfirmPass, setinputConfirmPass] = useState("");
  const [inputToken, setinputToken] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setConfirmInputPassword] = useState("")
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setInputUsername("")
    setinputEmail("")
    setinputPassword("")
    setinputConfirmPass("")
    setinputToken("")
  };
  const afterOpenModal = (event) => {
    event.preventDefault();
    if (event.target.name === "Username") {
      setInputUsername(event.target.value);
    } else if (event.target.name === "Email"){
      setinputEmail(event.target.value);
    } else if (event.target.name === "Password") {
      setinputPassword(event.target.value);
    } else if (event.target.name === "ConfirmPassword") {
      setinputConfirmPass(event.target.value);
    } else {
      setinputToken(event.target.value);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    signup(inputUsername, inputEmail, inputPassword, inputToken).then(console.log)
  };
  const validateForm = () => {
    return (
      inputEmail.includes("@") &&
      inputEmail.length > 0 &&
      inputPassword.length > 0 &&
      inputToken.length > 0 &&
      inputPassword === inputConfirmPass
      )
    };
  return (
    <div>
      <button onClick={openModal}>Sign Up</button>
      <Modal
        isOpen={modalIsOpen}
        onAfteropen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <h2>Sign Up</h2>
        <form>
          <input onChange={afterOpenModal} type="text" placeholder="Username" name="Username"></input>
          <br></br>
          <input onChange={afterOpenModal} type="email" placeholder="Email" name="Email"></input>
          <br></br>
          <input onChange={afterOpenModal} type="password" placeholder="Password" name="Password"></input>
          <br></br>
          <input onChange={afterOpenModal} type="password" placeholder="Confirm Password" name="ConfirmPassword"></input>
          <br></br>
          <input onChange={afterOpenModal} type="text" placeholder="Sign Up Token" name="Sign Up Token"></input>
          <br></br>
          <input disabled={!validateForm()} onClick={submitHandler} type="submit" value="Submit"></input>
        </form>
      </Modal>
    </div>
  );
};

export default Signup;
