import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const Signup = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setinputEmail] = useState("");
    const [inputToken, setinputToken] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const afterOpenModal = (event) => {
        console.log(event.target.value);
        setInputUsername(event.target.value);
        setinputEmail(event.target.value);
        event.preventDefault();
    }
    return(
        <div>
            <button onClick={openModal}>Sign Up</button>
            <Modal isOpen={modalIsOpen} onAfteropen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <button onClick={closeModal}>close</button>
                <h2>Sign Up</h2>
                <form onSubmit={afterOpenModal}>
                    <input type="text" placeholder="Username"></input><br></br>
                    <input type="email" placeholder="Email"></input><br></br>
                    <input type="password" placeholder="Password"></input><br></br>
                    <input type="password" placeholder="Confirm Password"></input><br></br>
                    <input type="text" placeholder="Sign Up Token"></input><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
            </Modal>
        </div>

    );
}

export default Signup