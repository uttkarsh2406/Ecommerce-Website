import React,{useState} from "react";
import { Card, Tabs,Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "./../../images/lapp.png";
import ProductListItem from "./ProductListItem";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import {useSelector,useDispatch} from "react-redux";
import  _ from "lodash";

const { Meta } = Card;

const { TabPane } = Tabs;

const SingleProduct = (props) => {
  const { product, onStarClick,star } = props;
  const { _id, title, description, slug, images } = product;
  const [tooltip,setTooltip]=useState('Click to add');
  const dispatch=useDispatch();
  
  const handleAddToCart=()=>{
    let cart=[]
    if(typeof window !== 'undefined'){
      if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,count:1
      })
      let unique=_.uniqWith(cart,_.isEqual);
      localStorage.setItem("cart",JSON.stringify(unique))
      setTooltip("Added")
      dispatch({
        type:"ADD_TO_CART",
        payload:unique,
      })
      dispatch({
        type:"SET_VISIBLE",
        payload:true,
      })
    }
  }
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
        {product && product.ratings && product.ratings.length>0 ? showAverage(product): <div className="text-center pt-1 pb-3">No Rating Yet!!</div>}
        <Card
          actions={[
          <Tooltip title={tooltip}>
        <a onClick={handleAddToCart}>
        <ShoppingCartOutlined
          className="text-success"/> <br/> Add Product to Cart
          </a>
        </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItem product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
