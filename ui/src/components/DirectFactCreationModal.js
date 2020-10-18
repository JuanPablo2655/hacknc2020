import React, { useState } from "react";
import Modal from "react-modal";
import Upload from "./Upload";

Modal.setAppElement("#root");

const DirectFactCreationModel = ({ on_submit }) => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [selected_file, set_selected_file] = useState(null);
  const [statement, set_statement] = useState("");
  const [page_number, set_page_number] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <input
        onChange={(e) => set_statement(e.target.value)}
        type="text"
        value={statement}
        placeholder="Statement"
      ></input>
      <input
        onChange={(e) => set_page_number(parseInt(e.target.value, 10))}
        type="text"
        value={page_number}
        placeholder="Page Number"
      ></input>
      <Upload on_set_file={(file) => set_selected_file(file)} />
      <input
        type="submit"
        onClick={(e) =>
          statement &&
          selected_file &&
          page_number &&
          on_submit(statement, selected_file, page_number)
        }
      ></input>
    </Modal>
  );
};

export default DirectFactCreationModel;
