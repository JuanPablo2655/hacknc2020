import React, { useState, useEffect } from "react";
import { get_fact } from "../utils";
import CreditPreview from "./CreditPreview";

const FactPreviewComponent = ({ fact_id }) => {
  const [fact, set_fact] = useState(null);
  useEffect(() => {
    (async () => {
      let fact = await get_fact(fact_id);
      console.log(fact);
      if (fact.DirectFact) {
        set_fact(fact.DirectFact);
      } else if (fact.SuperiorFact) {
        set_fact(fact.SuperiorFact);
      } else {
        console.warn("what?");
      }
    })().catch(console.error);
  }, [fact_id]);
  return (
    <div>
      {fact != null && (
        <div>
          <span>{fact.statement}</span>
          <CreditPreview username={"todo username"} />
        </div>
      )}
    </div>
  );
};

export default FactPreviewComponent;
