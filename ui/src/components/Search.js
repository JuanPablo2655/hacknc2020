import React, { useState } from "react";
import SearchLogo from "../zoom-2.svg"

const Search = ({ on_search, on_search_update }) => {
  const [search_query, set_search_query] = useState("");

  return (
    <div className="wrap">
    <div className="search">
      <input
        onChange={(e) => {
          set_search_query(e.target.value);
          on_search_update && on_search_update(e.target.value);
        }}
        value={search_query}
        type="text"
      />
      <input
        onClick={() => on_search(search_query)}
        type="submit"
        value="Submit"
        className="search-btn"
      />
      <img src={SearchLogo}></img>
    </div>
    </div>
  );
};

export default Search;
