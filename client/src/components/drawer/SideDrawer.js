import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "./../../images/lapp.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: "150",
    height: "100px",
    objectfit: "cover",
  };
  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      placement="right"
      closable={true}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      open={drawer}
    >
      {cart.map((p) => {
        return (
          <div className="row" key={p._id}>
            <div className="col">
              {p.images[0] ? (
                <div>
                  <img style={imageStyle} src={p.images[0].url} />
                  <p className="text-center text-light bg-secondary">
                    {p.title} x {p.count}
                  </p>
                </div>
              ) : (
                <div>
                  <img style={imageStyle} src={laptop} />
                  <p className="text-center text-light bg-secondary">
                    {p.title} x {p.count}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <Link to="/cart">
        <button
          onClick={() => {
            return dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
          className="text-center btn-primary btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
