import React, { useEffect, useState } from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Product = (props) => {
  const { match } = props;
  const { params } = match;
  const { slug } = params;
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRealted] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  
    const loadSingleProduct = () => {
      getProduct(slug).then((res) => {
        setProduct(res.data);
        getRelated(res.data._id).then((result) => {
          setRealted(result.data);
        });
      });
    };

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  },[product.ratings,user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log(res);
      loadSingleProduct();
    }, []);
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row py-5">
        <div className="col text-center pt-5 pb-5">
          <hr />
          Related Products
        </div>
        <hr />
        {related.length ? (
          related.map((pro) => {
            return (
              <div className="col-md-3" key={pro._id}>
                <ProductCard product={pro} />
              </div>
            );
          })
        ) : (
          <div className="text-center col"> No Product Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
