import React from 'react';
import ResultPageFactPreviewComponent from './ResultPageFactPreviewComponent';

const ResultsPage = ({ setSelectedFact, getSelectedFact, dFact, sFact }) => {
    return (
        <ResultPageFactPreviewComponent 
        dFact={dFact}
        sFact={sFact} 
        setSelectedFact={setSelectedFact} 
        getSelectedFact={getSelectedFact} 
        />
    );
}

export default ResultsPage;