import React from "react";
import { NavLink } from "react-router-dom";
const AdminNavBar = () => {
  return (
    <>
      <nav className="navbar align-items-end navbar-expand-lg bg-light px-lg-3 py-lg-2 shadow-sm  p-2 overflow-auto  noprint">
        <div className="container-fluid">
          <h4 className="navbar-brand mt-2">Admin Panel</h4>
          <button
            className="navbar-toggler shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminDropdown"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="adminDropdown">
            <ul className="nav nav-pills flex-row justify-content-evenly">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-black"
                  aria-current="page"
                  to="/admindashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-black"
                  aria-current="page"
                  to="/AdminAccounts"
                >
                  Accounts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-black"
                  aria-current="page"
                  to="/adminUploadImage"
                >
                  Upload Images
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-black"
                  aria-current="page"
                  to="/adminUploadFile"
                >
                  Upload Downloadable Files
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavBar;
