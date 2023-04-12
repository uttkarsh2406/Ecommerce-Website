import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "./../../../functions/product";
import { useEffect } from "react";
import ProductUpdateForm from "./../../../components/Forms/ProductUpdateForm";
import { getCategories } from "../../../functions/category";
import { getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/Forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { updateProduct } from "./../../../functions/product";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
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

const ProductUpdate = (props) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { match,history } = props;
  const { params } = match;
  const { slug } = params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };
  const loadProduct = () => {
    getProduct(slug)
      .then((result) => {
        // console.log(result);
        setValues({ ...values, ...result.data });
        getCategorySubs(result.data.category._id).then((res) => {
          setSubOptions(res.data);
        });
        let arr = [];
        result.data.subs.map((s) => {
          arr.push(s._id);
        });
        // console.log(arr);
        setArrayOfSubIds(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs=arrayOfSubIds
    values.category=selectedCategory ?selectedCategory :values.category
    updateProduct(slug,values,user.token).then((res)=>{
      setLoading(false);
      toast.success(`${res.data.title} is updated`);
      history.push("/admin/products")
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.err)
    })
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value)
      .then((result) => {
        setSubOptions(result.data);
      })
      .catch((err) => {});
    if (values.category._id === e.target.value) {
      loadProduct();
    } else {
      setArrayOfSubIds([]);
    }
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
            <h4>Product Update </h4>
          )}
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
