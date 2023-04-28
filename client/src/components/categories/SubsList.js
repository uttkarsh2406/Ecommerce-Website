import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getSubs} from "./../../functions/sub";

const SubList
 = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => {
    return subs.map((sub) => {
      return (
          <Link to={`/sub/${sub.slug}`} key={sub._id} className="text-decoration-none text-muted col-md-2 btn btn-outline-secondary btn-lg btn-block btn-raised m-3 ">
            <div >
          {sub.name}

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
          showSubs()
        )}
      </div>
    </div>
  );
};

export default SubList; 
