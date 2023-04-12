import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
const Product = (props) => {
  const { match } = props;
  const { params } = match;
  const { slug } = params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (<div className="container-fluid">
    <div className="row pt-4">
        <SingleProduct product={product} />
    </div>
    <div className="row">

        <div className="col text-center pt-5 pb-5">
          <hr/>
          Related Products</div>
          <hr/>
    </div>
  </div>);
};

export default Product;
