import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useNavigate } from "react-router";
import { decryptObjData } from "../modules/encryption";
import { percentTotal, round2dec } from "../modules/calculatefunctions";
import { useGlobalContext } from "../context/Store";
const Class12ERegister = () => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let studentdata = JSON.parse(searchParams.get("details"));
  let userdetails = decryptObjData("tid");
  let school = userdetails.school;

  useEffect(() => {
    if (!state) {
      navigate("/logout");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="text-black container-fluid ben">
      <div className="mx-auto col-md-6">
        <div className="noprint my-3">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 rounded"
            onClick={window.print}
          >
            Print Register
          </button>
        </div>

        <div className="noprint">
          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-center timesFont">
          DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
        </h2>

        <h5 className="text-center timesFont">
          EVALUATION REGISTER FOR STUDENTS
        </h5>
      </div>

      <div className="mt-3 d-flex flex-row justify-content-between timesFont">
        <h6>Name of School: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          {school}
        </h6>
        <h6>&nbsp;Section: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          (A)
        </h6>
        <h6>&nbsp;Class: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          {studentdata[0].class}
        </h6>
        <h6>&nbsp;Academic Year: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          {new Date().getFullYear()}
        </h6>
      </div>
      <div className="my-1">
        <table className="text-center">
          <thead>
            <tr style={{ height: 30 }}>
              <th className="text-center " rowSpan={2}>
                Roll No
              </th>
              <th className="text-center " rowSpan={2}>
                Name of the Student
              </th>
              <th className="text-center " rowSpan={2}>
                Date of Birth
              </th>
              <th className="text-center " rowSpan={2}>
                <p className="m-0 p-0 ">Name of the Indicator</p>
                <p className="m-0 p-0 ">সূচকের নাম</p>
              </th>
              <th className="text-center " colSpan={3}>
                FORMATIVE / প্রস্তুতিকালীন
              </th>
              <th className="text-center " colSpan={6}>
                SUMMATIVE / পর্যায়ক্রমিক
              </th>
            </tr>
            <tr>
              <th className="text-center ">
                <p className="m-0 p-0">1</p>
                <p className="m-0 p-0">(10)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">2</p>
                <p className="m-0 p-0">(20)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">3</p>
                <p className="m-0 p-0">(20)</p>
              </th>
              <th className="text-center ">Name of the Subject</th>
              <th className="text-center ">
                <p className="m-0 p-0">1</p>
                <p className="m-0 p-0">(10)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">2</p>
                <p className="m-0 p-0">(10)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">3</p>
                <p className="m-0 p-0">(30)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">TOTAL</p>
                <p className="m-0 p-0">(50)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">GRADE</p>
              </th>
            </tr>
          </thead>
          {studentdata.map((el, ind) => {
            let comm_summ_totalmarks =
              parseInt(el.summative_1_comm) +
              parseInt(el.summative_2_comm) +
              parseInt(el.summative_3_comm);
            let comm_summ_totalmarks_per = parseInt(
              round2dec((comm_summ_totalmarks * 50) / 100)
            );
            let comm_summ_totalmarks_percent = percentTotal(
              comm_summ_totalmarks_per
            );
            let corr_summ_totalmarks =
              parseInt(el.summative_1_corr) +
              parseInt(el.summative_2_corr) +
              parseInt(el.summative_3_corr);
            let corr_summ_totalmarks_per = parseInt(
              round2dec((corr_summ_totalmarks * 50) / 100)
            );
            let corr_summ_totalmarks_percent = percentTotal(
              corr_summ_totalmarks_per
            );
            let prob_summ_totalmarks =
              parseInt(el.summative_1_Prob) +
              parseInt(el.summative_2_Prob) +
              parseInt(el.summative_3_Prob);
            let prob_summ_totalmarks_per = parseInt(
              round2dec((prob_summ_totalmarks * 50) / 100)
            );
            let prob_summ_totalmarks_percent = percentTotal(
              prob_summ_totalmarks_per
            );
            let mp_summ_totalmarks =
              parseInt(el.summative_1_ment_phy) +
              parseInt(el.summative_2_ment_phy) +
              parseInt(el.summative_3_ment_phy);
            let mp_summ_totalmarks_per = parseInt(
              round2dec((mp_summ_totalmarks * 50) / 100)
            );
            let mp_summ_totalmarks_percent = percentTotal(
              mp_summ_totalmarks_per
            );

            return (
              <>
                <tr key={ind}>
                  <th className="text-center" rowSpan={5}>
                    {el.roll_no}
                  </th>
                  <th className="text-center" rowSpan={5}>
                    {el.student_name}
                  </th>
                  <th className="text-center" rowSpan={5}>
                    {el.birthdate}
                  </th>
                  <th className="">Participation / অংশগ্রহণ</th>

                  <th className="text-center">
                    {el.formative_1_p === 0 ? "" : el.formative_1_p}
                  </th>
                  <th className="text-center">
                    {el.formative_2_p === 0 ? "" : el.formative_2_p}
                  </th>
                  <th className="text-center">
                    {el.formative_3_p === 0 ? "" : el.formative_3_p}
                  </th>
                  <th className="">ABILITY TO COMMUNICATE</th>
                  <th className="text-center">
                    {el.summative_1_comm === 0 ? "" : el.summative_1_comm}
                  </th>
                  <th className="text-center">
                    {el.summative_2_comm === 0 ? "" : el.summative_2_comm}
                  </th>
                  <th className="text-center">
                    {el.summative_3_comm === 0 ? "" : el.summative_3_comm}
                  </th>
                  <th className="text-center">
                    {el.summative_3_comm !== 0 ? comm_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.summative_3_beng !== 0
                      ? comm_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Questioning and Experimentation</th>
                  <th className="text-center">
                    {el.formative_1_qe !== 0 ? el.formative_1_qe : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_qe !== 0 ? el.formative_2_qe : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_qe !== 0 ? el.formative_3_qe : ""}
                  </th>
                  <th className="">ABILITY TO CORRELATE</th>
                  <th className="text-center">
                    {el.summative_1_corr === 0 ? "" : el.summative_1_corr}
                  </th>
                  <th className="text-center">
                    {el.summative_2_corr === 0 ? "" : el.summative_2_corr}
                  </th>
                  <th className="text-center">
                    {el.summative_3_corr === 0 ? "" : el.summative_3_corr}
                  </th>
                  <th className="text-center">
                    {el.summative_3_corr !== 0 ? corr_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.summative_3_beng !== 0
                      ? corr_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Interpretation and Application</th>
                  <th className="text-center">
                    {el.formative_1_ia !== 0 ? el.formative_1_ia : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ia !== 0 ? el.formative_2_ia : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ia !== 0 ? el.formative_3_ia : ""}
                  </th>
                  <th className="">ABILITY IN PROBLEM SOLVING</th>
                  <th className="text-center">
                    {el.summative_1_Prob === 0 ? "" : el.summative_1_Prob}
                  </th>
                  <th className="text-center">
                    {el.summative_2_Prob === 0 ? "" : el.summative_2_Prob}
                  </th>
                  <th className="text-center">
                    {el.summative_3_Prob === 0 ? "" : el.summative_3_Prob}
                  </th>
                  <th className="text-center">
                    {el.summative_3_Prob !== 0 ? prob_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.summative_3_math !== 0
                      ? prob_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Empathy and Co-operation</th>
                  <th className="text-center">
                    {el.formative_1_ec !== 0 ? el.formative_1_ec : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ec !== 0 ? el.formative_2_ec : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ec !== 0 ? el.formative_3_ec : ""}
                  </th>
                  <th className="" rowSpan={2}>
                    ABILITY IN MENTAL AND PHYSICAL COORDINATION
                  </th>
                  <th className="text-center" rowSpan={2}>
                    {el.summative_1_ment_phy === 0
                      ? ""
                      : el.summative_1_ment_phy}
                  </th>
                  <th className="text-center" rowSpan={2}>
                    {el.summative_2_ment_phy === 0
                      ? ""
                      : el.summative_2_ment_phy}
                  </th>
                  <th className="text-center" rowSpan={2}>
                    {el.summative_3_ment_phy === 0
                      ? ""
                      : el.summative_3_ment_phy}
                  </th>
                  <th className="text-center" rowSpan={2}>
                    {el.summative_3_ment_phy !== 0 ? mp_summ_totalmarks : ""}
                  </th>
                  <th className="text-center" rowSpan={2}>
                    {el.summative_3_ment_phy !== 0
                      ? mp_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Aesthetic and Creative Expression</th>
                  <th className="text-center">
                    {el.formative_1_ace !== 0 ? el.formative_1_ace : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ace !== 0 ? el.formative_2_ace : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ace !== 0 ? el.formative_3_ace : ""}
                  </th>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Class12ERegister;
