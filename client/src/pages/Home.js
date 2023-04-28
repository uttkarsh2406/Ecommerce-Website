import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/categories/CategoryList";
import SubList from "../components/categories/SubsList";

const Home = () => {
  return (
    <div>
      <div className="mt-4 p-5 bg-secondary text-danger rounded text-center fw-bold">
        <div className="container">
          <h1 className="display-4">
            <Jumbotron
              text={["Latest Products", "New Arrivals", "Best Sellers"]}
            />
          </h1>
        </div>
      </div>
      <h3 className="text-center p-3 mt-5 display-4 bg-secondary rounded text-center">
        <Jumbotron text={"New Arrivals"} />
      </h3>
      <NewArrivals />
      <h3 className="text-center p-3 mt-5 display-4 bg-secondary rounded text-center">
        <Jumbotron text={"Best Sellers"} />
      </h3>
      <BestSellers />
      <h3 className="text-center p-3 mt-5 display-4 bg-secondary rounded text-center">
        <Jumbotron text={"Categories"} />
      </h3>
      <CategoryList />
      <h3 className="text-center p-3 mt-5 display-4 bg-secondary rounded text-center">
        <Jumbotron text={"Sub Categories"} />
      </h3>
      <SubList />
      <br />
      <br />
      <footer className="text-center text-primary">&#9400; Created By Uttkarsh Raj <br/>
      Contact me at uttkarshraj789@gmail.com
      </footer>
    </div>
  );
};

export default Home;
