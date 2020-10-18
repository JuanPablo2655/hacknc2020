import React from 'react';
import CreditPreview from './CreditPreview';
import DirectFact from './DirectFact';
import PdfPreview from './PdfPreview';
import TickReference from './TickReference';

const DirectFactComponent = ( {dFact, getFact, getUser, setSelectedFact, getSelectedFact} ) => {
    return(
        <div>            
            <DirectFact dFact={dFact} getFact={getFact}/>
            <PdfPreview dFact={dFact} />
            <CreditPreview username={getUser()} />
            <TickReference dFact={dFact} 
            setSelectedFact={setSelectedFact} 
            getSelectedFact={getSelectedFact} 
            />
        </div>
    );
};

export default DirectFactComponent;
