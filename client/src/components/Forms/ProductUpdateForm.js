import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    handleCategoryChange,
    categories,
    subOptions,
    arrayOfSubIds,
    setArrayOfSubIds,
    selectedCategory,
  } = props;
  const {
    title,
    description,
    price,
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

  return (
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
          value={shipping}
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
          value={color}
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
          value={brand}
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

      <div className="form-group mb-4 ">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory :category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>

      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please Select"
          value={arrayOfSubIds}
          onChange={(e) => {
            setArrayOfSubIds(e);
          }}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
      <button className="btn btn-outline-info mt-4" type="submit">
        Save
      </button>
    </form>
  );
};

export default ProductUpdateForm;
