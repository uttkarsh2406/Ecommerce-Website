import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import AllProducts from "./product.js/AllProducts.";
const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Admin DashBoard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
