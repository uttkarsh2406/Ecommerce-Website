import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "./../../images/lapp.png";
import { Link } from "react-router-dom";
const {Meta} =Card

const ProductCard = (props) => {
    const {product}=props
    const {images,title,description,slug}=product

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "300px", width: "400px", objectFit: "cover" }}
          className="p-2"
        />
      }
      actions={[
          <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-danger" /> <br/> View Product
        </Link>,
        <>
        <ShoppingCartOutlined
          className="text-danger"/> <br/> View Product to Cart
          </>
      ]}
    >
      <Meta
        title={title}
        description={` ${description && description.substring(0, 40)}...`}
      />
    </Card>

  );
};

export default ProductCard;
