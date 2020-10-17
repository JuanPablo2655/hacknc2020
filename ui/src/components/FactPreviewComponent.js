import React from 'react';
import CreditPreview from './CreditPreview';

const FactPreviewComponent = ({ get_fact, sFact, dFact, get_user }) => {
    return (
        <div>
            <h4>{get_fact()}</h4>
            <CreditPreview username={get_user()} />
        </div>
    );
}

export default FactPreviewComponent;