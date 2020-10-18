import React from 'react';

const Search = ({ setInputText, setResults, getFact }) => {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const resultTextHandler = (e) => {
        e.preventDefault();
        setResults([getFact()]);
    }
    return(
        <form>
            <input onChange={inputTextHandler} type="text"/>
            <input onClick={resultTextHandler} type="submit" value="Submit"/>
        </form>
    );
}

export default Search