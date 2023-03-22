import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/Forms/CategoryForm";

const CategoryUpdate = (props) => {
  const { history, match } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategory = () => {
    getCategory(match.params.slug)
      .then((result) => {
        setName(result.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadCategory();
  }, );


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

          <CategoryForm handleSbumit={handleSbumit} name={name} setName={setName} />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
