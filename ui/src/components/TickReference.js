import React from "react";

const TickReference = ({ setSelectedFact, getSelectedFact, dFact }) => {
  const selected_fact_handler = (e) => {
    if (e.target.checked === true) {
      setSelectedFact([...getSelectedFact, dFact.fact_id]);
    } else {
      setSelectedFact(getSelectedFact.filter((el) => el !== dFact.fact_id));
    }
  };
  return (
    <div>
      <input
        onChange={selected_fact_handler}
        type="checkbox"
        name="reference"
      ></input>
      <label htmlFor="reference">Reference this fact!</label>
      <br></br>
    </div>
  );
};

export default TickReference;
