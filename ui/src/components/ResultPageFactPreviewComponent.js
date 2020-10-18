import React, { useState, useEffect } from "react";
import TickReference from "./TickReference";
import { get_fact } from "../utils";

const ResultPageFactPreviewComponent = ({ fact_id, set_selected }) => {
  const [fact, set_fact] = useState(null);
  useEffect(() => {
    (async () => get_fact(fact_id))()
      .then((fact) => {
        if (fact.DirectFact) {
          set_fact(fact.DirectFact);
        } else if (fact.SuperiorFact) {
          set_fact(fact.SuperiorFact);
        } else {
          throw "not a direct or superior";
        }
      })
      .catch(console.error);
  }, [fact_id]);

  return (
    <div>
      {fact && (
        <div>
          <TickReference fact_id={fact_id} set_selected={set_selected} />
          <span> {fact.statement} </span>
        </div>
      )}
    </div>
  );
};

export default ResultPageFactPreviewComponent;
