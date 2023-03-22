import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

const initialState = {
  title: "MacBook Pro",
  description: "This is best laptop",
  price: "120000",
  categries: "",
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
    const {user}=useSelector((state)=>({...state}));
  const [values, setValues] = useState(initialState);
  const {
    title,
    description,
    price,
    categories,
    category,
    quantity,
    subs,
    shipping,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values,user.token).then((res)=>{
        toast.success("Product Created");

        
    }).catch((error)=>{
        toast.error(error.response.data.err)
    })

  };

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>-- Please select --</option>

                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>color</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>-- Please select --</option>
                {colors.map((c) => {
                  return (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>-- Please select --</option>
                {brands.map((c) => {
                  return (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-outline-info mt-4" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
