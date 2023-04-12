import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "./../../images/lapp.png";
import ProductListItem from "./ProductListItem";
const { Meta } = Card;

const {TabPane}=Tabs

const SingleProduct = (props) => {
  const { product } = props;
  const { title, description, slug, images } = product;

  return (
    <div className="row">
      <div className="col-md-6">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => {
                  return <img src={image.url} key={image.pucblic_id} />;
              })}
          </Carousel>
        ) : (
          <Card cover={<img src={laptop} className="mb-3" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 8492890796 to Learn More About the Product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-6">
            <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <div>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </div>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >

          <ProductListItem product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
