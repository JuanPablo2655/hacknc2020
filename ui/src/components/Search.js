import React from 'react';

const Search = ({ setInputText }) => {
    const inputTextHander = (event) => {
        setInputText(event.target.value);
    }
    return(
        <form>
            <input onChange={inputTextHander} type="text"/>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default Search