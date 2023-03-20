import React from "react";

const LocalSearch = (props) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    props.setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className="container pt-4 pb-4">
      <input
        type="search"
        placeholder="filter"
        value={props.keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </div>
  );
};

export default LocalSearch;
