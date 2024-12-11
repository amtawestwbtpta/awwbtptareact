import React, { useEffect } from "react";
import AdminNavBar from "./AdminNavBar";

import { useNavigate } from "react-router";
import { useGlobalContext } from "../context/Store";
const AdminDashboard = () => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Admin Dashboard";
    if (state !== "admin") {
      localStorage.clear();
      navigate("/logout");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid  my-3">
      <AdminNavBar />
      <h1 className="text-center text-primary">Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
