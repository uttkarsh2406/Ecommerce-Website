import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { useEffect } from "react";
import FileUpload from "../../../components/Forms/FileUpload";
import ProductCreateForm from "../../../components/Forms/ProductCreateForm";
import { LoadingOutlined } from "@ant-design/icons";
const initialState = {
  title: "MacBook Pro",
  description:
    "MacBook Pro. Our most powerful notebooks. Fast M1 processors, incredible graphics, and spectacular Retina displays. Now available in a 14-inch model.",
  price: "180000",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "white", "Blue"],
  brands: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
    "Acer",
    "Sony",
    "DELL",
    "HP",
  ],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((result) => {
        setValues({ ...values, categories: result.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        toast.success("Product Created");
      })
      .catch((error) => {
        toast.error(error.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((result) => {
        setSubOptions(result.data);
      })
      .catch((err) => {});
    setShowSub(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Create </h4>
          )}
          {/* {JSON.stringify(values.images)} */}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
