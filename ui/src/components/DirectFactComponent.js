import React from 'react';
import CreditPreview from './CreditPreview';
import DirectFact from './DirectFact';
import PdfPreview from './PdfPreview';
import TickReference from './TickReference';

const DirectFactComponent = ( {dFact, get_user, set_selected_fact, get_selected_fact} ) => {
    return(
        <div>            
            <div>
                <DirectFact dFact={dFact} />
            </div>
            <div>
                <PdfPreview dFact={dFact} />
            </div>
            <div>
                <CreditPreview username={get_user()} />
            </div>
            <div>
                <TickReference dFact={dFact} set_selected_fact={set_selected_fact} get_selected_fact={get_selected_fact} />
            </div>
        </div>
    );
};

export default DirectFactComponent;
