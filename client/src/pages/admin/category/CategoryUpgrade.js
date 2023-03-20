import React, { useEffect, useState } from "react";
import AdminNav from "./../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";

const CategoryUpdate = (props) => {
  const { history, match } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug)
      .then((result) => {
        setName(result.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSbumit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((result) => {
        setLoading(false);
        setName("");
        toast.success(`${result.data.name} is Updated`);
        history.push("/admin/category");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data);
      });
  };

  const CategoryForm = () => (
    <form onSubmit={handleSbumit}>
      <div className="form-group mb-2">
        <label>Name</label>
        <input
          type="text"
          className="form-control mb-2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter New Password"
          autoFocus
        />
        <button className="btn btn-outline-primary mb-5">Save</button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading....</h4>
          ) : (
            <h4>Update Category</h4>
          )}

          {CategoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
