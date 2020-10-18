import React from "react";

const DirectFact = ({ dFact, getFact }) => {
  console.log(getFact())
  return <h1>{dFact.statement}</h1>;
};

export default DirectFact;
