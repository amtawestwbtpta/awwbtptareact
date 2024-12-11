import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import SwiperSlides from "./SwiperSlides";
import { useGlobalContext } from "../context/Store";
import { createDownloadLink } from "../modules/calculatefunctions";
const Home = () => {
  const el = React.useRef(null);
  const { state, slideState } = useGlobalContext();
  document.title = "WBTPTA AMTA WEST:Homepage";
  const [showSlides, setShowSlides] = useState(false);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Welcome To WBTPTA Amta West Circle's New Website."],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     document.getElementById("launchModal").click();
  //   }, [1000]);
  // }, []);
  useEffect(() => {
    setShowSlides(true);
  }, []);
  return (
    <div className="container my-5">
      {/* <button
        type="button"
        id="launchModal"
        className="btn btn-primary noprint d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Our New Website powered by Next JS Framework is available
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowSlides(true)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <h5 className="text-center text-info">
                  For New User Faster Sign Up & More, recommended Using Our New
                  Website
                </h5>
              </div>
              <a
                className="d-inline-block m-2 fs-3 fw-bold text-decoration-none text-primary"
                href="https://awwbtpta.vercel.app"
                rel="noopener noreferrer"
              >
                {`https://awwbtpta.vercel.app`}
                <br />
                <i className="bi bi-hand-index-thumb"> Click Here</i>
              </a>
            </div>
            <div className="modal-footer mx-auto">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={() => setShowSlides(true)}
              >
                Continue using This Website
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="my-3" style={{ height: "70px" }}>
        {window.screen.width < 780 ? (
          <span
            className="text-primary text-center fs-6 mb-3 web-message"
            ref={el}
          />
        ) : (
          <span
            className="text-primary text-center fs-3 mb-3 web-message"
            ref={el}
          />
        )}
      </div>

      {/* <SwiperComp /> */}
      {/* {showSlides && <SwiperSlides />} */}
      {state === "admin" && slideState.length > 0 && (
        <button
          type="button"
          className="btn btn-sm m-5 btn-warning"
          onClick={() => {
            createDownloadLink(slideState, "slides");
          }}
        >
          Download Slide Data
        </button>
      )}
    </div>
  );
};

export default Home;
