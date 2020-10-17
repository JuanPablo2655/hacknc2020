import React from 'react';
import CreditPreview from './CreditPreview';
import DirectFact from './DirectFact';
import PdfPreview from './PdfPreview';
import TickReference from './TickReference';

const DirectFactComponent = ( {dFact, get_fact, get_user, set_selected_fact, get_selected_fact} ) => {
    return(
        <div>            
            <DirectFact dFact={dFact} get_fact={get_fact}/>
            <PdfPreview dFact={dFact} />
            <CreditPreview username={get_user()} />
            <TickReference dFact={dFact} 
            set_selected_fact={set_selected_fact} 
            get_selected_fact={get_selected_fact} 
            />
        </div>
    );
};

export default DirectFactComponent;
