import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PasswordForm from "./PasswordForm";
import Loader from "./Loader";
const OtpForm = () => {
  const [otpform, showform] = useState(true);
  const [loader, setLoader] = useState(false);
  const emailRef = useRef();
  const sendOtp = async (e) => {
    e.preventDefault();
    if (ValidateEmail(emailRef.current.value)) {
      const url = `https://awwbtpta.vercel.app/api/forgotpassword`;
      let options = {
        method: "POST",
        url: url,
        data: { email: emailRef.current.value },
      };
      try {
        setLoader(true);
        const response = await axios(options);
        const record = response.data;
        if (record.success) {
          toast.success(record.message);
          showform(false);
          setLoader(false);
        } else {
          setLoader(false);
          toast.error(record.message);
        }
      } catch (e) {
        setLoader(false);
        toast.error("Something Went Wrong!");
      }
    } else {
      toast.error("Please enter a valid email address.");
    }
  };
  function ValidateEmail(mail) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }
  document.title = "WBTPTA AMTA WEST:Forgot Password";
  return (
    <div className="container mt-5">
      {loader ? <Loader /> : null}
      <h3 className="text-center text-primary mb-3">Reset Password</h3>
      <div className="col-md-6 mx-auto">
        {otpform ? (
          <form autoComplete="off" id="otpForm" method="post">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                required
                className="form-control"
                autoComplete="off"
                ref={emailRef}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary m-1"
                onClick={sendOtp}
              >
                Send OTP
              </button>
              <Link to="/login">
                <button className="btn btn-danger m-1 px-4">Back</button>
              </Link>
            </div>
          </form>
        ) : (
          <PasswordForm email={emailRef.current.value} />
        )}
      </div>
    </div>
  );
};

export default OtpForm;