import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Profile from "../pages/profile/Profile";
import DashBoardHome from "../pages/dashboard/DashBoardHome";
import Product from "../pages/products/Product";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="home" element={<DashBoardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="product" element={<Product />} />
      </Route>
      {/* <Route path="" element={<DashbaordPage />} />
      <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
};

export default AllRoutes;
