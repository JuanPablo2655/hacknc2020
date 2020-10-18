import React from 'react';
import TickReference from './TickReference';

const ResultPageFactPreviewComponent = ({ set_selected_fact, get_selected_fact, dFact, sFact }) => {
    return (
        <TickReference 
        dFact={dFact}
        sFact={sFact} 
        set_selected_fact={set_selected_fact} 
        get_selected_fact={get_selected_fact} 
        />
    );
}

export default ResultPageFactPreviewComponent;