import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrWidth, SetscrWidth] = useState(window.screen.width);
  useEffect(() => {
    window.addEventListener("resize", () => SetscrWidth(window.screen.width));
  }, [scrWidth]);
  return (
    <div className="container-fluid text-center text-white ben noprint">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-4 p-2" style={{ backgroundColor: "orange" }}>
          <h3 className="m-0">এসো উৎসুকচিত্ত,</h3>
        </div>
        <div className="col-md-4 p-2" style={{ backgroundColor: "white" }}>
          {scrWidth > 768 ? (
            <h3 className="text-primary m-0">
              <Link className="navbar-brand" to="/">
                আমতা পশ্চিম চক্র তৃণমূল প্রাথমিক শিক্ষক সমিতি
              </Link>
            </h3>
          ) : (
            <h5 className="text-primary m-0">
              <Link className="navbar-brand" to="/">
                আমতা পশ্চিম চক্র তৃণমূল প্রাথমিক শিক্ষক সমিতি
              </Link>
            </h5>
          )}
        </div>
        <div className="col-md-4 bg-success p-2">
          <h3 className="m-0">এসো আনন্দিত প্রাণ॥</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
