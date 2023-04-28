import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => {
    return categories.map((category) => {
      return (
          <Link to={`/category/${category.slug}`} key={category._id} className="text-decoration-none text-muted col btn btn-outline-secondary btn-lg btn-block btn-raised m-3 ">
            <div >
          {category.name}

        </div>
          </Link>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
