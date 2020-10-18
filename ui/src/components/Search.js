import React, { useState } from "react";

const Search = ({ on_search, on_search_update }) => {
  const [search_query, set_search_query] = useState("");

  return (
    <div>
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
      />
    </div>
  );
};

export default Search;
