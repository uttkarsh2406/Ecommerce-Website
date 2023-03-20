import React from "react";

const CategoryForm = (props) => {
    return (

        <form onSubmit={props.handleSbumit}>
    <div className="form-group mb-2">
      <label>Name</label>
      <input
        type="text"
        className="form-control mb-2"
        value={props.name}
        onChange={(e) => {
            props.setName(e.target.value);
        }}
        placeholder="Enter New Password"
        autoFocus
        />
      <button className="btn btn-outline-primary mb-5">Save</button>
    </div>
  </form>
        );
};


export default CategoryForm