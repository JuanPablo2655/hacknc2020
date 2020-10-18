import React from 'react';
import CreditPreview from './CreditPreview';

const FactPreviewComponent = ({ getFact, sFact, dFact, getUser, getResults }) => {
    return (
        <div>
            {/* {getResults.map((result) => (
                if (result.supporting_documents === undefined){
                    <SuperiorFact />
                } else {
                    <DirectFact />
                }
            ))} */}
            <CreditPreview username={getUser()} />
        </div>
    );
}

export default FactPreviewComponent;