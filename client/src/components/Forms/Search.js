import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();
  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };  

  return (
    <>
      <form
        className="row row-cols-lg-auto g-3 align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="col-12 ">
          <div className="input-group">
            <input
              type="search"
              value={text}
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Search"
              onChange={handleChange}
            />
          </div>
        </div>
        <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
      </form>
    </>
  );
};

export default Search;
