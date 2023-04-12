import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LodingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", page)
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
    <div>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-md-4 mt-3" key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center pt-2 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 12}
            onChange={(value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
