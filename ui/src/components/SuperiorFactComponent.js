import React from "react";
import FactPreviewComponent from "./FactPreviewComponent";
import TickReference from "./TickReference";

const SuperiorFactComponent = ({ fact, set_selected_fact }) => {
  console.log(fact);
  return (
    <div>
      <h1>{fact.statement}</h1>
      <TickReference
        fact_id={fact.metadata.fact_id}
        set_selected={set_selected_fact}
      />
      {fact.supporting_facts.map((fact_id) => {
        return <FactPreviewComponent fact_id={fact_id} key={fact_id} />;
      })}
    </div>
  );
};

export default SuperiorFactComponent;
