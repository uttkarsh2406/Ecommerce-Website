import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/nav/AdminNav";
import { getProdcutsByCount } from "./../../../functions/product";
import AdminProductCard from "./../../../components/cards/AdminProductCard";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProdcutsByCount(15)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All products</h4>
          )}
          <div className="col">
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 pb-4">
                  <AdminProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
