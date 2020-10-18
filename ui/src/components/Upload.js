import React from "react";

const Upload = ({ on_set_file }) => {
  return (
    <input
      onChange={(e) => on_set_file(e.target.files[0])}
      type="file"
      accept="application/pdf"
    ></input>
  );
};

export default Upload;
