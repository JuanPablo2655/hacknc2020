import React, { useState, useEffect } from "react";
import DirectFactComponent from "./DirectFactComponent";
import SuperiorFactComponent from "./SuperiorFactComponent";
import { get_fact } from "../utils";

const FactComponent = ({ fact_id }) => {
  const [fact, set_fact] = useState(null);

  useEffect(() => {
    (async () => get_fact(fact_id))()
      .then((fact) => set_fact(fact))
      .catch(console.error);
  }, [fact_id]);

  return (
    <div className="App">
      {fact != null && fact.SuperiorFact && (
        <SuperiorFactComponent
          fact={fact.SuperiorFact}
          set_selected_fact={console.log}
        />
      )}

      {fact != null && fact.DirectFact && (
        <DirectFactComponent
          fact={fact.DirectFact}
          set_selected={console.log}
        />
      )}
    </div>
  );
};

export default FactComponent;
