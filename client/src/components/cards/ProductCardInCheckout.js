import React from "react";
import ModalImage from "react-modal-image";
import laptop from "./../../images/lapp.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined,CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckout = (props) => {
  let dispatch = useDispatch();
  const { p } = props;

  const handelRemove=()=>{
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i,1)
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }
  const handle = (e) => {
    let count = e.target.value <= 0 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Max Available Quantity : ${p.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
          
        }

      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      
    }
  }; 
  const handleColorChange = (e) => {
    // console.log(e.target.value)

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const color = ["Black", "Brown", "Silver", "white", "Blue"];
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>₹{p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            id={p._id}
            className="form-control"
          >
            {p.color ? (
              <option>{p.color}</option>
            ) : (
              <option>Select Color</option>
            )}
            {color
              .filter((c) => {
                return c !== p.color;
              })
              .map((c) => {
                return <option key={c}>{c}</option>;
              })}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handle}
            size="5"
          />
        </td  >
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined onClick={ handelRemove}
          className="text-danger pointer" />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
