import React from "react";
import CreditPreview from "./CreditPreview";
import PdfPreview from "./PdfPreview";
import TickReference from "./TickReference";

const DirectFactComponent = ({ fact, set_selected }) => {
  return (
    <div>
      <span>{fact.statement}</span>
      <PdfPreview document_id={fact.document_id} />
      <CreditPreview username={"todo replace"} />
      <TickReference
        fact_id={fact.metadata.fact_id}
        set_selected={set_selected}
      />
    </div>
  );
};

export default DirectFactComponent;
