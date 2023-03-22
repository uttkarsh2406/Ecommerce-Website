import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub,updateSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/Forms/CategoryForm";
import LocalSearch from "../../../components/Forms/LocalSearch";

const SubUpdate = (props) => {
  const {history,match}=props;
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);


  const loadCategories = () => {
    getCategories()
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
    const loadSub = () => {
      getSub(match.params.slug)
      .then((result) => {
        setName(result.data.name);
        setParent(result.data.parent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSbumit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug,{ name,parent }, user.token)
      .then((result) => {
        setLoading(false);
        setName("");
        toast.success(`${result.data.name} is Updated`);
        // loadSubs();
        history.push('/admin/sub')
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data);
        console.log(error);
      });
  };



  const searched = (keyword) => (s) => {
    return s.name.toLowerCase().includes(keyword);
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
            <h4>Update Sub Category</h4>
          )}

          <div className="form-group mb-4 ">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => {
                setParent(e.target.value);
              }}
            >
              <option>--Please Select--</option>
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id} selected={c._id===parent}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <CategoryForm
            handleSbumit={handleSbumit}
            name={name}
            setName={setName}
          />

          

        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
