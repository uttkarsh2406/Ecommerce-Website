import React, { useEffect, useState } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = (props) => {
  const { match } = props;
  const { params } = match;
  const { slug } = params;
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setSub(res.data.sub);
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
                {products.length} Result's in "{sub.name}" sub
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

export default SubHome;
