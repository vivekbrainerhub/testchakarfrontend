import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
