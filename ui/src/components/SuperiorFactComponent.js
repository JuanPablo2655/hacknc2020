import React from 'react';
import FactPreviewComponent from './FactPreviewComponent';
import SuperiorFact from './SuperiorFact'
import TickReference from './TickReference';

const SuperiorFactComponent = ({ sFact, dFact, get_fact, get_user, set_selected_fact, get_selected_fact }) => {
    return (
        <div>
            <SuperiorFact sFact={sFact} get_fact={get_fact} />
            <FactPreviewComponent 
            get_fact={get_fact}
            get_user={get_user} 
            sFact={sFact} 
            dFact={dFact}
            />
            <TickReference dFact={dFact} 
            set_selected_fact={set_selected_fact} 
            get_selected_fact={get_selected_fact} 
            />
        </div>
    );
}

export default SuperiorFactComponent;