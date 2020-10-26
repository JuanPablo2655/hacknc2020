import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Upload from "./Upload";

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window["pdfjs-dist/build/pdf"];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.worker.js";

Modal.setAppElement("#root");

const DirectFactCreationModel = ({ on_submit, isOpen, onClose }) => {
  const [selected_file, set_selected_file] = useState(null);
  // PDF.js document
  const [document, set_document] = useState(null);
  const [statement, set_statement] = useState("");
  const [page_number_input, set_page_number_input] = useState("");

  const show_page = () => {
    if (document == null) {
      return;
    }

    (async () => {
      let page_number = parseInt(page_number_input, 10) | 1;
      let page = await document.getPage(page_number);

      var scale = 1;
      var viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      var canvas = window.document.getElementById("document-canvas");
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext);
    })().catch(console.error);
  };

  //Update PDF preview
  // eslint-disable-next-line
  useEffect(() => show_page(), [document, page_number_input]);

  const on_file_upload = (file) => {
    (async () => {
      set_selected_file(file);

      let data = new Int8Array(await file.arrayBuffer());

      let pdf = await pdfjsLib.getDocument({
        data,
      }).promise;
      set_document(pdf);
    })().catch(console.error);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <canvas id="document-canvas" />
      <input
        onChange={(e) => set_statement(e.target.value)}
        type="text"
        value={statement}
        placeholder="Statement"
      ></input>
      <input
        onChange={(e) => set_page_number_input(e.target.value)}
        type="text"
        value={page_number_input}
        placeholder="Page Number"
      ></input>
      <Upload on_set_file={(file) => on_file_upload(file)} />
      <input
        type="submit"
        onClick={(e) =>
          statement &&
          selected_file &&
          isNaN(parseInt(page_number_input, 10)) &&
          on_submit(statement, selected_file, parseInt(page_number_input))
        }
      ></input>
    </Modal>
  );
};

export default DirectFactCreationModel;
