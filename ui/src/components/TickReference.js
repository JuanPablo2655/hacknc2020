import React from "react";

const TickReference = ({ set_selected, fact_id }) => {
  return (
    <div>
      <input
        onChange={(e) => {
          set_selected(fact_id, e.target.checked);
        }}
        type="checkbox"
        name="reference"
      ></input>
      <label htmlFor="reference">Reference this fact!</label>
      <br></br>
    </div>
  );
};

export default TickReference;
