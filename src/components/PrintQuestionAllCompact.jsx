import "../css/PotraitPrint.css";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { useNavigate } from "react-router";
import { NumInWords, round5 } from "../modules/calculatefunctions";
import QRCode from "react-qr-code";
const PrintQuestionAllCompact = () => {
  const { state, stateObject, questionRateState } = useGlobalContext();
  const navigate = useNavigate();

  const [allData, setAllData] = useState([]);
  const [qRate, setQRate] = useState({
    pp_rate: "",
    i_rate: "",
    ii_rate: "",
    iii_rate: "",
    iv_rate: "",
    v_rate: "",
    term: "",
    year: "",
  });
  let pp_rate = qRate.pp_rate;
  let i_rate = qRate.i_rate;
  let ii_rate = qRate.ii_rate;
  let iii_rate = qRate.iii_rate;
  let iv_rate = qRate.iv_rate;
  let v_rate = qRate.v_rate;
  let term = qRate.term;
  let year = qRate.year;

  useEffect(() => {
    setAllData(stateObject);
    setQRate(questionRateState);
    document.title = "WBTPTA AMTA WEST:Print All Question Invoice";
    if (!state) {
      localStorage.clear();
      navigate("/logout");
    }
    //eslint-disable-next-line
  }, [stateObject]);

  return (
    <div className="container-fluid">
      <div className="mx-auto my-5 noprint">
        <button
          type="button"
          className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
          onClick={window.print}
        >
          Print Invoice
        </button>

        <button
          type="button"
          className="btn btn-info text-white font-weight-bold p-2 m-5 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
      <table className="table table-resposive table-bordered border-dark border-1">
        <tbody>
          {allData.map((el, ind) => {
            let total_rate = round5(
              el.cl_pp_student * pp_rate +
                el.cl_1_student * i_rate +
                el.cl_2_student * ii_rate +
                el.cl_3_student * iii_rate +
                el.cl_4_student * iv_rate +
                el.cl_5_student * v_rate
            );

            return (
              <tr
                key={ind}
                style={{ verticalAlign: "middle", height: "100px" }}
                className="timesFont bordered"
              >
                <td style={{ textAlign: "center" }}>Sl: {ind + 1}</td>
                <td style={{ textAlign: "center" }}>
                  Scan Here: <br />
                  {/* <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=Amta West Circle, School: ${
                      el.school
                    },GP: ${
                      el.gp
                    }, Year: ${year}, Term: ${term}, PP Students ${parseInt(
                      el.cl_pp_student
                    )}, Class I Students ${parseInt(
                      el.cl_1_student
                    )}, Class II Students ${parseInt(
                      el.cl_2_student
                    )}, Class III Students ${parseInt(
                      el.cl_3_student
                    )}, Class IV Students ${parseInt(
                      el.cl_4_student
                    )}, Class V Students ${parseInt(
                      el.cl_5_student
                    )}, Total Amount ${total_rate}.&amp;size=60x60`}
                    alt="QRCode"
                    style={{ width: 60, height: 60 }}
                  /> */}
                  <QRCode
                    size={256}
                    style={{ height: 60, width: 60 }}
                    value={`Amta West Circle, School: ${el.school},GP: ${
                      el.gp
                    }, Year: ${year}, Term: ${term}, PP Students ${parseInt(
                      el.cl_pp_student
                    )}, Class I Students ${parseInt(
                      el.cl_1_student
                    )}, Class II Students ${parseInt(
                      el.cl_2_student
                    )}, Class III Students ${parseInt(
                      el.cl_3_student
                    )}, Class IV Students ${parseInt(
                      el.cl_4_student
                    )}, Class V Students ${parseInt(
                      el.cl_5_student
                    )}, Total Amount ${total_rate}.`}
                    viewBox={`0 0 256 256`}
                  />
                </td>

                <td colSpan={2} style={{ textAlign: "center" }}>
                  <h6>{el.school.toUpperCase()}</h6>
                </td>

                <td style={{ textAlign: "center" }}>GP: {el.gp}</td>
                <td style={{ textAlign: "center" }}>PP: {el.cl_pp_student}</td>
                <td style={{ textAlign: "center" }}>
                  CLASS I: {el.cl_1_student}
                </td>
                <td style={{ textAlign: "center" }}>
                  CLASS II: {el.cl_2_student}
                </td>
                <td style={{ textAlign: "center" }}>
                  CLASS III: {el.cl_3_student}
                </td>
                <td style={{ textAlign: "center" }}>
                  CLASS IV: {el.cl_4_student}
                </td>
                {parseInt(el.cl_5_student) !== 0 ? (
                  <td style={{ textAlign: "center" }}>
                    CLASS V: {el.cl_5_student}
                  </td>
                ) : null}

                <td style={{ textAlign: "center" }}>
                  Total Students: {el.total_student}
                </td>
                {parseInt(el.cl_5_student) !== 0 ? (
                  <td style={{ textAlign: "center" }}>
                    Total Amount: <i className="bi bi-currency-rupee"></i>
                    {total_rate}
                    <br /> (Rupees {NumInWords(total_rate)} Only)
                  </td>
                ) : (
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Total Amount: <i className="bi bi-currency-rupee"></i>
                    {total_rate}
                    <br /> ( Rupees {NumInWords(total_rate)} Only )
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mx-auto my-5 noprint">
        <button
          type="button"
          className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
          onClick={window.print}
        >
          Print Invoice
        </button>

        <button
          type="button"
          className="btn btn-info text-white font-weight-bold p-2 m-5 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PrintQuestionAllCompact;
