import React from 'react';

const TickReference = ({ set_selected_fact, get_selected_fact, dFact }) => {
    const selected_fact_handler = (e) => {
        if (e.target.checked === true) {
            set_selected_fact([...get_selected_fact, dFact.fact_id])
        } else {
            set_selected_fact(get_selected_fact.filter(el => el !== dFact.fact_id));
        }
    }
    return (
        <div>
            <input onChange={selected_fact_handler} type="checkbox" name="reference"></input>
            <label htmlFor="reference">Reference this fact!</label><br></br>
        </div>
    );
}

export default TickReference;