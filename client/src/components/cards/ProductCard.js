import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "./../../images/lapp.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
const {Meta} =Card

const ProductCard = (props) => {
    const {product}=props
    const {images,title,description,slug,price}=product


  return (
    <div>

    {product && product.ratings && product.ratings.length>0 ? showAverage(product): <div className="text-center pt-1 pb-3">No Rating Yet!!</div>}

    <Card
      cover={
        <img
        src={images && images.length ? images[0].url : laptop}
        alt="Product_IMAGE"
        style={{ height: "300px", width: "400px", objectFit: "cover" }}
        className="p-2"
        />
      }
      actions={[
          <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-danger" /> <br/> View Product
        </Link>,
        <a onClick={handleAddToCart}>
        <ShoppingCartOutlined
          className="text-success"/> <br/> Add Product to Cart
          </a>
      ]}
      >
      <Meta
        title={`${title} - ₹ ${price}`}
        description={` ${description && description.substring(0, 40)}...`}
        />
    </Card>

        </div>
  );
};

export default ProductCard;
