import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { firestore } from "../context/FirbaseContext";
import { collection, getDocs, query } from "firebase/firestore";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import { EffectCube } from "swiper/modules";

function QuestionPublic() {
  const [data, setData] = useState([]);
  const [showSlide, setShowSlide] = useState(false);
  const [qData, setQData] = useState([]);
  const [qRateData, setQRateData] = useState({
    question_pp_rate: 0,
    question_1_rate: 0,
    question_2_rate: 0,
    question_3_rate: 0,
    question_4_rate: 0,
    question_5_rate: 0,
    term: "1st",
    year: new Date().getFullYear(),
  });
  const [selectedSchool, setSelectedSchool] = useState({});

  const [questionInputField, setQuestionInputField] = useState({
    question_pp_rate: 0,
    question_1_rate: 0,
    question_2_rate: 0,
    question_3_rate: 0,
    question_4_rate: 0,
    question_5_rate: 0,
    term: "1st",
    year: 2024,
  });
  const userData = async () => {
    const q = query(collection(firestore, "questions"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setQData(data);
    setShowSlide(true);
    setData(data);

    const q2 = query(collection(firestore, "question_rate"));

    const querySnapshot2 = await getDocs(q2);
    const data2 = querySnapshot2.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setQRateData(data2[0]);
    setQuestionInputField({
      id: data2[0].id,
      question_pp_rate: data2[0].pp_rate,
      question_1_rate: data2[0].i_rate,
      question_2_rate: data2[0].ii_rate,
      question_3_rate: data2[0].iii_rate,
      question_4_rate: data2[0].iv_rate,
      question_5_rate: data2[0].v_rate,
      term: data2[0].term,
      year: data2[0].year,
    });
  };
  const changeData = (e) => {
    setSelectedSchool(qData.filter((el) => el.udise.match(e.target.value))[0]);
  };

  function round2dec(value) {
    if (value % 1 !== 0) {
      return Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
    } else {
      return value;
    }
  }
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Question Section";

    userData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [questionInputField]);
  return (
    <div className="container my-5">
      <div className="col-md-6 mx-auto">
        {showSlide ? (
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              EffectCube,
              Autoplay,
            ]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            effect={"cube"}
            cubeEffect={{
              slideShadows: true,
              shadowOffset: 7,
              shadowScale: 0.74,
            }}
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {data.map((el, ind) => {
              return (
                <SwiperSlide key={ind}>
                  <div
                    className="mb-5 bg-light p-2"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <h6 className="text-success">{el.school}</h6>
                    <h6 className="text-primary">UDISE: {el.udise}</h6>
                    <h6 className="text-primary">GP: {el.gp}</h6>
                    <h6 className="text-primary">PP: {el.cl_pp_student}</h6>
                    <h6 className="text-primary">I: {el.cl_1_student}</h6>
                    <h6 className="text-primary">II: {el.cl_2_student}</h6>
                    <h6 className="text-primary">III: {el.cl_3_student}</h6>
                    <h6 className="text-primary">IV: {el.cl_4_student}</h6>
                    <h6 className="text-primary">V: {el.cl_5_student}</h6>
                    <h6 className="text-primary">
                      TOTAL STUDENT: {el.total_student}
                    </h6>
                    <h6 className="text-primary">
                      TOTAL AMOUNT: {el.total_rate}
                    </h6>
                    <h6 className="text-primary">PAYMENT STATUS: {el.paid}</h6>
                    <h6 className="text-primary">PAID AMOUNT: {el.payment}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
      </div>

      <div className="col-md-6 mx-auto my-3">
        <select
          className="form-select"
          id="selectForm"
          defaultValue={""}
          onChange={changeData}
          aria-label="Default select example"
        >
          <option value="">Select School Name</option>
          {qData.length > 0
            ? qData.map((el) => {
                return (
                  <option key={el.id} value={el.udise}>
                    {el.school}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {Object.keys(selectedSchool).length > 0 ? (
        <div className="col-md-6 mx-auto p-2 my-3">
          <table className="container text-center">
            <tr>
              <th colSpan="2">
                Amta West Circle, {qRateData.term} Summative Exam,{" "}
                {qRateData.year}
              </th>
            </tr>
            <tr>
              <th>School Name</th>
              <th>
                <span>{selectedSchool.school}</span>
              </th>
            </tr>
            <tr>
              <th>Gram Panchayet</th>
              <th>
                <span id="gp">{selectedSchool.gp}</span>
              </th>
            </tr>
            <tr>
              <th>PP Students</th>
              <th>
                <span id="pp">{selectedSchool.cl_pp_student}</span>
              </th>
            </tr>
            <tr>
              <th>I Students</th>
              <th>
                <span id="i">{selectedSchool.cl_1_student}</span>
              </th>
            </tr>
            <tr>
              <th>II Students</th>
              <th>
                <span id="ii">{selectedSchool.cl_2_student}</span>
              </th>
            </tr>
            <tr>
              <th>III Students</th>
              <th>
                <span id="iii">{selectedSchool.cl_3_student}</span>
              </th>
            </tr>
            <tr>
              <th>IV Students</th>
              <th>
                <span id="iv">{selectedSchool.cl_4_student}</span>
              </th>
            </tr>
            {selectedSchool.cl_5_student > 0 ? (
              <tr className="v_hide">
                <th className="v_hide">V Students</th>
                <th className="v_hide">
                  <span id="v">{selectedSchool.cl_5_student}</span>
                </th>
              </tr>
            ) : null}
            <tr>
              <th>Total</th>
              <th>
                <span id="total">{selectedSchool.total_student}</span>
              </th>
            </tr>
            <tr>
              <th>PP Cost</th>
              <th>
                <span id="pp_rate">
                  {round2dec(selectedSchool.cl_pp_student * qRateData.pp_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>I Cost</th>
              <th>
                <span id="i_rate">
                  {round2dec(selectedSchool.cl_1_student * qRateData.i_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>II Cost</th>
              <th>
                <span id="ii_rate">
                  {round2dec(selectedSchool.cl_2_student * qRateData.ii_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>III Cost</th>
              <th>
                <span id="iii_rate">
                  {round2dec(selectedSchool.cl_3_student * qRateData.iii_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>IV Cost</th>
              <th>
                <span id="iv_rate">
                  {round2dec(selectedSchool.cl_4_student * qRateData.iv_rate)}
                </span>
              </th>
            </tr>

            {selectedSchool.cl_5_rate > 0 ? (
              <tr className="v_hide">
                <th className="v_hide">V Cost</th>
                <th className="v_hide">
                  <span id="v_rate">
                    {round2dec(selectedSchool.cl_5_student * qRateData.v_rate)}
                  </span>
                </th>
              </tr>
            ) : null}
            <tr>
              <th>Total Cost</th>
              <th>
                <span id="total_rate">
                  {Math.floor(
                    selectedSchool.cl_pp_student * qRateData.pp_rate +
                      selectedSchool.cl_1_student * qRateData.i_rate +
                      selectedSchool.cl_2_student * qRateData.ii_rate +
                      selectedSchool.cl_3_student * qRateData.iii_rate +
                      selectedSchool.cl_4_student * qRateData.iv_rate +
                      selectedSchool.cl_5_student * qRateData.v_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th>Payment Status</th>
              <th>
                <span id="payment">{selectedSchool.paid}</span>
              </th>
            </tr>
            <tr>
              <td>
                <Link
                  className="btn btn-sm m-1 btn-info"
                  to={`/printquestioninvoice?sl=${selectedSchool.sl}&school=${selectedSchool.school}&gp=${selectedSchool.gp}&cl_pp_student=${selectedSchool.cl_pp_student}&cl_1_student=${selectedSchool.cl_1_student}&cl_2_student=${selectedSchool.cl_2_student}&cl_2_student=${selectedSchool.cl_2_student}&cl_3_student=${selectedSchool.cl_3_student}&cl_4_student=${selectedSchool.cl_4_student}&cl_5_student=${selectedSchool.cl_5_student}&total_student=${selectedSchool.total_student}&pp_rate=${qRateData.pp_rate}&i_rate=${qRateData.i_rate}&ii_rate=${qRateData.ii_rate}&iii_rate=${qRateData.iii_rate}&iv_rate=${qRateData.iv_rate}&v_rate=${qRateData.v_rate}&term=${qRateData.term}&year=${qRateData.year}`}
                >
                  Print Invoice
                </Link>
              </td>
            </tr>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default QuestionPublic;
