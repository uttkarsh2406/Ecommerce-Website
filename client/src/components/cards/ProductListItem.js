import React from "react";
import { Link } from "react-router-dom";

const ProductListItem = (props) => {
  const { product } = props;
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <ul className="list-group list-group flush fs-5 fw-light">
      <li className="list-group-item mx-3 d-flex justify-content-between">
        <div>Price</div>
        <div>₹ {price}</div>
      </li>
      {category && (
        <li className="list-group-item mx-3 d-flex justify-content-between">
          <div>category</div>
          <Link
            to={`/category/${category.slug}`}
            className="text-decoration-none"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subs && (
        <li className="list-group-item mx-3 d-flex justify-content-between">
          <div>Subs</div>
          <div>
            {subs.map((sub) => {
              return (
                <>
                  <Link
                    key={sub._id}
                    to={`/sub/${sub.slug}`}
                    className="text-decoration-none"
                  >
                    {sub.name}
                  </Link>
                  <span> </span>
                </>
              );
            })}{" "}
          </div>
        </li>
      )}
      <li className="list-group-item mx-3 d-flex justify-content-between">
        <div>Shipping</div>
        <div>{shipping}</div>
      </li>

      <li className="list-group-item mx-3 d-flex justify-content-between">
        <div>color</div>
        <div>{color}</div>
      </li>

      <li className="list-group-item mx-3 d-flex justify-content-between">
        <div>Brand</div>
        <div>{brand}</div>
      </li>

      <li className="list-group-item mx-3 d-flex justify-content-between">
        <div>Available</div>
        <div>{quantity}</div>
      </li>
      <li className="list-group-item mx-3 d-flex justify-content-between">
        <div>Sold</div>
        <div>{sold}</div>
      </li>
    </ul>
  );
};

export default ProductListItem;
