import React from 'react';

const SuperiorFact = ({ sFact, get_fact }) => {
    return (
        <h1>{get_fact()}</h1>
    );
}

export default SuperiorFact;