import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { useNavigate } from "react-router";
import { DA, HRA } from "../modules/constants";

const JulySalary = () => {
  const navigate = useNavigate();
  const { state, teachersState } = useGlobalContext();
  const [data, setData] = useState(teachersState);
  const [isclicked, setIsclicked] = useState(false);
  const year = new Date().getFullYear();
  useEffect(() => {
    if (state !== "admin") {
      navigate("/logout");
    }

    !isclicked
      ? (document.title = "WBTPTA AMTA WEST:All Teacher's July Salary Data")
      : (document.title =
          "WBTPTA AMTA WEST:All WBTPTA Teacher's July Salary Data");
    //eslint-disable-next-line
  }, [isclicked]);

  return (
    <div>
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        {!isclicked ? (
          <button
            type="button"
            className="btn btn-success text-white btn-sm font-weight-bold m-2 noprint rounded"
            onClick={() => {
              setData(
                teachersState.filter((el) => el.association === "WBTPTA")
              );
              setIsclicked(true);
            }}
          >
            Only WBTPTA Teachers
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-info text-white btn-sm font-weight-bold m-2 noprint rounded"
            onClick={() => {
              setData(teachersState);
              setIsclicked(false);
            }}
          >
            All Teachers
          </button>
        )}
        <h3 className="text-center text-primary mb-3">
          {!isclicked
            ? " All Teacher's July Salary Data"
            : "All WBTPTA Teacher's July Salary Data"}
        </h3>
        <table className="table table-responsive table-bordered table-striped text-center text-black">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Teacher Name</th>
              <th>School Name</th>
              <th>Designation</th>
              <th>Basic Pay</th>
              <th>Da</th>
              <th>HRA</th>
              <th>Addl.</th>
              <th>MA</th>
              {year === 2024 ? <th>IR</th> : null}
              <th>Gross Pay</th>
              <th>GPF</th>
              <th>GSLI</th>
              <th>PTAX</th>
              <th>NET PAY</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, ind) => {
              let basic = el.basic;
              let mbasic = el.mbasic;
              let da = Math.round(basic * DA);
              let ir = Math.round(mbasic * 0.04);
              let hra = Math.round(basic * HRA);
              let addl = el.addl;
              let ma = el.ma;
              let gross;
              if (year === 2024) {
                gross = basic + da + ir + hra + addl + ma;
              } else {
                gross = basic + da + hra + addl + ma;
              }
              let gpf = el.julyGpf;
              let gsli = el.gsli;
              let disability = el.disability;
              let ptax;
              if (gross > 40000) {
                ptax = 200;
              } else if (gross > 25000) {
                ptax = 150;
              } else if (gross > 15000) {
                ptax = 130;
              } else if (gross > 10000) {
                ptax = 110;
              } else {
                ptax = 0;
              }
              if (disability === "YES") {
                ptax = 0;
              }
              let netpay = gross - gpf - gsli - ptax;
              return (
                <tr key={ind} className="nobreak">
                  <td className="nobreak">{ind + 1}</td>
                  <td className="nobreak">{el.tname}</td>
                  <td className="nobreak">{el.school}</td>
                  <td className="nobreak">{el.desig}</td>
                  <td className="nobreak">{basic}</td>
                  <td className="nobreak">{da}</td>
                  <td className="nobreak">{hra}</td>
                  <td className="nobreak">{addl}</td>
                  <td className="nobreak">{ma}</td>
                  {year === 2024 ? <td className="nobreak">{ir}</td> : null}
                  <td className="nobreak">{gross}</td>
                  <td className="nobreak">{gpf}</td>
                  <td className="nobreak">{gsli}</td>
                  <td className="nobreak">{ptax}</td>
                  <td className="nobreak">{netpay}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        {!isclicked ? (
          <button
            type="button"
            className="btn btn-success text-white btn-sm font-weight-bold m-2 noprint rounded"
            onClick={() => {
              setData(
                teachersState.filter((el) => el.association === "WBTPTA")
              );
              setIsclicked(true);
            }}
          >
            Only WBTPTA Teachers
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-info text-white btn-sm font-weight-bold m-2 noprint rounded"
            onClick={() => {
              setData(teachersState);
              setIsclicked(false);
            }}
          >
            All Teachers
          </button>
        )}
      </div>
    </div>
  );
};

export default JulySalary;
