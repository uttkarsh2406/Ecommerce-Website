import React, { useState } from "react";
import { Card, Skeleton, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "./../../images/lapp.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import {useSelector,useDispatch} from "react-redux";
import  _ from "lodash";
const {Meta} =Card

const ProductCard = (props) => {
  const {user,cart}=useSelector((state)=>({...state}))
  const {product}=props;
  const [tooltip,setTooltip]=useState('Click to add');
  const {images,title,description,slug,price}=product;
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
        <Tooltip title={tooltip}>
        <a onClick={handleAddToCart}>
        <ShoppingCartOutlined
          className="text-success"/> <br/> Add Product to Cart
          </a>
        </Tooltip>
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
