import React, { useEffect, useState } from "react";
import AdminNav from "./../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to Delete?")) {
      setLoading(true);
      await removeCategory(slug, user.token)
        .then((result) => {
          setLoading(false);
          toast.success(`${result.data.name} Deleted`);
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };

  const loadCategories = () => {
    getCategories()
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSbumit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((result) => {
        setLoading(false);
        setName("");
        toast.success(`${result.data.name} is Created`);
        loadCategories();
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
            <h4>Create Category</h4>
          )}

          {CategoryForm()}

          {categories.map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => {
                  handleRemove(c.slug);
                }}
                className="btn btn-sm float-end"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-end">
                  <EditOutlined />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;