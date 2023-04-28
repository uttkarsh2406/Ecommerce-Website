import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = (props) => {
  const { match } = props;
  const { params } = match;
  const { slug } = params;
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 display-4 bg-secondary rounded text-center">
              Loading....
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 display-4 bg-secondary rounded text-center">
                {products.length} Result's in "{category.name}" Category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((product)=>{
            return (
                <div className="col-md-4" key={product.id}>
                    <ProductCard product={product} />
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default CategoryHome;
