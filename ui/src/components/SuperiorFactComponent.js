import React from 'react';
import FactPreviewComponent from './FactPreviewComponent';
import SuperiorFact from './SuperiorFact'
import TickReference from './TickReference';

const SuperiorFactComponent = ({ sFact, dFact, getFact, getUser, setSelectedFact, getSelectedFact, getResults }) => {
    return (
        <div>
            <SuperiorFact sFact={sFact} getFact={getFact} />
            <FactPreviewComponent 
            getFact={getFact}
            getUser={getUser} 
            getResults={getResults}
            sFact={sFact} 
            dFact={dFact}
            />
            <TickReference dFact={dFact} 
            setSelectedFact={setSelectedFact} 
            getSelectedFact={getSelectedFact} 
            />
        </div>
    );
}

export default SuperiorFactComponent;