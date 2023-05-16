import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "./../functions/user";

const Cart = (props) => {
  const { history } = props
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCartItems = () => {
    return (
      <table className="table table-boarded">
        <thead className="table-dark">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {
          cart.map((p) => {
            return (
              <ProductCardInCheckout key={p._id} p={p} />
            );
          })
        }
      </table>
    );
  };

  const saveOrderToDb = () => {
    userCart(cart,user.token).then((res)=>{
      console.log('Cart Post Result', res);
      if(res.data.ok){
        history.push('/checkout')

      }
    }).catch((err)=>{
      console.log('Cart Save Error', err);
    })
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No Products in Cart. <Link to="/shop">Continue Shopping</Link>{" "}
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => {
            return (
              <div key={i}>
                <p>
                  {" "}
                  {c.title} x {c.count} = ₹{c.price * c.count}
                </p>
              </div>
            );
          })}
          <hr />
          Total: <b>₹{getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className="btn btn-small btn-primary mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                className="text-white text-decoration-none"
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
