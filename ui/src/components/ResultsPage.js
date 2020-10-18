import React from "react";
import ResultPageFactPreviewComponent from "./ResultPageFactPreviewComponent";

const ResultsPage = ({ fact_ids, set_selected }) => {
  return fact_ids.map((fact_id) => (
    <ResultPageFactPreviewComponent
      fact_id={fact_id}
      set_selected={set_selected}
      key={fact_id}
    />
  ));
};

export default ResultsPage;
