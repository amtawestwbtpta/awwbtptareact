import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { useNavigate } from "react-router";
import {
  getServiceLife,
  monthNamesWithIndex,
  months,
  uniqArray,
} from "../modules/calculatefunctions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ServiceConfirmation from "./Helpers/ServiceConfirmation";
import BenefitProforma from "./Helpers/BenefitProforma";
import BenefitApplication from "./Helpers/BenefitApplication";
const YearWiseTeachers = () => {
  const { state, teachersState } = useGlobalContext();
  const navigate = useNavigate();
  const data = teachersState.filter((el) => el.association === "WBTPTA");

  const [filteredData, setFilteredData] = useState([]);
  const [moreFilteredData, setMoreFilteredData] = useState([]);
  const [monthText, setMonthText] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [joiningMonths, setJoiningMonths] = useState([]);
  const [serviceArray, setServiceArray] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showConfForm, setShowConfForm] = useState(false);
  const [showProforma, setShowProforma] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const handleChange = (e) => {
    if (e.target.value !== "") {
      let monthSelect = document.getElementById("month-select");
      if (monthSelect) {
        monthSelect.value = "";
      }
      setMonthText("");
      const selectedValue = e.target.value;
      let x = [];
      let y = [];
      data.map((teacher) => {
        const joiningYear = teacher.doj.split("-")[2];
        const joiningMonth = teacher.doj.split("-")[1];
        if (joiningYear === selectedValue) {
          x.push(teacher);
          monthNamesWithIndex.map((month) => {
            if (joiningMonth === month.index) {
              return y.push(month);
            }
          });
        }
      });
      setSelectedYear(selectedValue);
      setFilteredData(x);
      setMoreFilteredData(x);
      setJoiningMonths(uniqArray(y).sort((a, b) => a.rank - b.rank));
    } else {
      setFilteredData([]);
      setSelectedYear("");
    }
  };
  const handleMonthChange = (month) => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      const joiningMonth = teacher.doj.split("-")[1];
      if (joiningYear === selectedYear && joiningMonth === month.index) {
        return x.push(teacher);
      }
    });
    setFilteredData(x);
    setMonthText(month.monthName);
  };
  const getData = () => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      x.push(joiningYear);
      x = uniqArray(x);
      return (x = x.sort((a, b) => a - b));
    });

    setServiceArray(x);
  };

  const getArrayLength = (year) => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      if (joiningYear === year) {
        return x.push(teacher);
      }
    });
    return x.length;
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid my-3">
      <h3 className="text-center text-primary">Year Wise Teachers</h3>
      <div className="col-md-4 mx-auto mb-3 noprint">
        <select
          className="form-select"
          defaultValue={""}
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option className="text-center text-primary" value="">
            Select Joining Year
          </option>
          {serviceArray.map((el, i) => (
            <option
              className="text-center text-success text-wrap"
              key={i}
              value={el}
            >
              {el +
                " - " +
                (new Date().getFullYear() - parseInt(el)) +
                " Year - " +
                getArrayLength(el) +
                ` ${getArrayLength(el) > 1 ? " Teachers" : " Teacher"}`}
            </option>
          ))}
        </select>
      </div>
      {selectedYear ? (
        <div className="noprint">
          {joiningMonths.length > 1 && (
            <h4 className="text-center text-primary">
              Filter By Joining Month
            </h4>
          )}
        </div>
      ) : null}
      <div className="row d-flex justify-content-center noprint">
        {joiningMonths.length > 1 && (
          <div className="col-md-4 mx-auto mb-3 noprint">
            <select
              className="form-select"
              id="month-select"
              defaultValue={""}
              onChange={(e) => {
                if (e.target.value) {
                  handleMonthChange(JSON.parse(e.target.value));
                } else {
                  setMonthText("");
                  setFilteredData(moreFilteredData);
                  document.getElementById("month-select").value = "";
                }
              }}
              aria-label="Default select example"
            >
              <option value="" className="text-center text-primary">
                Select Joining Month
              </option>
              {joiningMonths.map((month, index) => (
                <option
                  className="text-center text-success"
                  key={index}
                  value={JSON.stringify(month)}
                >
                  {month.monthName +
                    " - " +
                    moreFilteredData.filter(
                      (m) => m.doj.split("-")[1] === month.index
                    ).length +
                    ` ${
                      moreFilteredData.filter(
                        (m) => m.doj.split("-")[1] === month.index
                      ).length > 1
                        ? " Teachers"
                        : " Teacher"
                    }`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-primary text-white font-weight-bold p-2 rounded"
                onClick={() => {
                  window.print();
                }}
              >
                Print Page
              </button>
            </div>
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-warning  p-2 rounded"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-success p-2 rounded"
                onClick={() => setShowTable(!showTable)}
              >
                {showTable ? "Hide Table Format" : "Show Table Format"}
              </button>
            </div>
          </div>

          {moreFilteredData.length > 1 ? (
            <div>
              <h4 className="text-center text-primary">
                {moreFilteredData.length > 1
                  ? `Total ${moreFilteredData.length} Teachers`
                  : `Total ${moreFilteredData.length} Teacher`}{" "}
                Joined on Year {selectedYear}
              </h4>
              {monthText && (
                <div>
                  <h4 className="text-center text-primary">
                    {filteredData.length}
                    {filteredData.length > 1 ? " Teachers" : " Teacher"} Joined
                    on {monthText}
                  </h4>
                  <button
                    type="button"
                    className="btn btn-danger noprint p-2 rounded"
                    onClick={() => {
                      setFilteredData(moreFilteredData);
                      setMonthText("");
                      let monthSelect = document.getElementById("month-select");
                      if (monthSelect) {
                        monthSelect.value = "";
                      }
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-center text-primary">
                1 Teacher Joined on{" "}
                {filteredData.length > 0 &&
                  months[parseInt(filteredData[0].doj?.split("-")[1]) - 1]}{" "}
                {selectedYear}
              </h4>
            </div>
          )}
        </div>
      )}
      <div className="container text-center">
        {!showTable ? (
          <div className="row d-flex justify-content-center">
            {selectedYear ? (
              filteredData.length > 0 ? (
                filteredData.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2 nobreak"
                      style={{ backgroundColor: "seashell" }}
                    >
                      <h6 className="text-center text-black">
                        {index + 1}) Teacher's Name:
                        <br /> {el.tname} ({`${el.desig}`})
                      </h6>
                      <h6 className="text-center text-black">
                        School:
                        <br /> {el.school}
                      </h6>
                      <h6>
                        <a
                          href={`tel: +91${el.phone}`}
                          className="d-inline-block  text-decoration-none text-black"
                        >
                          Mobile: {el.phone}
                        </a>
                      </h6>
                      <h6 className="text-center text-black">
                        Service Life:
                        <br /> {getServiceLife(el.doj)}
                      </h6>
                      <h6 className="text-center text-black">
                        Date of Joining:
                        <br /> {el.doj}
                      </h6>
                      <h6 className="text-center text-black">
                        DOJ at This Post in This School:
                        <br /> {el.dojnow}
                      </h6>
                      <h6 className="text-center text-black">
                        Date of Birth:
                        <br /> {el.dob}
                      </h6>
                      <h6 className="text-center text-black">
                        Date of Retirement:
                        <br /> {el.dor}
                      </h6>
                    </div>
                  );
                })
              ) : (
                <h4 className="text-center text-primary">
                  No Teachers found for the selected Year.
                </h4>
              )
            ) : null}
          </div>
        ) : (
          <div
            className="m-2 mx-auto"
            style={{
              overflowX: "auto",
            }}
          >
            <table
              className="ttable-striped table-hover text-center"
              style={{
                verticalAlign: "middle",
                width: "100%",
                overflowX: "auto",
                border: "1px solid",
                padding: 2,
                textAlign: "center",
              }}
            >
              <thead>
                <tr
                  style={{
                    border: "1px solid",
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  <th
                    style={{
                      border: "1px solid",
                      padding: 2,
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    Sl
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                      padding: 2,
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    Teacher's Name
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                      padding: 2,
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    School
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                      padding: 2,
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    Date of Joining
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                      padding: 2,
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    Mobile
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                      padding: 2,
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((el, index) => {
                  return (
                    <tr
                      style={{
                        border: "1px solid",
                        padding: 2,
                        textAlign: "center",
                      }}
                      key={index}
                    >
                      <td
                        style={{
                          border: "1px solid",
                          padding: 2,
                          textAlign: "center",
                        }}
                        scope="row"
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid",
                          padding: 2,
                          textAlign: "center",
                        }}
                      >
                        {el.tname}
                      </td>
                      <td
                        style={{
                          border: "1px solid",
                          padding: 2,
                          textAlign: "center",
                        }}
                      >
                        {el.school}
                      </td>
                      <td
                        style={{
                          border: "1px solid",
                          padding: 2,
                          textAlign: "center",
                        }}
                      >
                        {el.doj}
                      </td>
                      <td
                        style={{
                          border: "1px solid",
                          padding: 2,
                          textAlign: "center",
                        }}
                      >
                        <a
                          href={`tel: +91${el.phone}`}
                          className="d-inline-block text-decoration-none text-black"
                          style={{ padding: 2 }}
                        >
                          {el.phone}
                        </a>
                      </td>
                      <td
                        style={{
                          border: "1px solid",
                          padding: 2,
                          textAlign: "center",
                        }}
                      ></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>{" "}
      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-primary text-white font-weight-bold p-2 rounded"
                onClick={() => {
                  window.print();
                }}
              >
                Print Page
              </button>
            </div>
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-warning  p-2 rounded"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-success p-2 rounded"
                onClick={() => setShowTable(!showTable)}
              >
                {showTable ? "Hide Table Format" : "Show Table Format"}
              </button>
            </div>
          </div>
        </div>
      )}
      {state === "admin" && (
        <div className="noprint">
          {new Date().getFullYear() - parseInt(selectedYear) === 2 && (
            <div>
              <button
                type="button"
                className="btn btn-primary m-2 p-2 rounded"
                onClick={() => setShowConfForm(!showConfForm)}
              >
                {showConfForm
                  ? "Hide Confirmation Form"
                  : "Show Confirmation Form"}
              </button>
            </div>
          )}
          {new Date().getFullYear() - parseInt(selectedYear) === 2 &&
            showConfForm && (
              <div className="my-5">
                <PDFDownloadLink
                  document={<ServiceConfirmation data={filteredData} />}
                  fileName={`Service Confirmation Form.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: 11,
                    color: "#fff",
                    backgroundColor: "darkgreen",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                    margin: 20,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Form"
                  }
                </PDFDownloadLink>
              </div>
            )}
          {(new Date().getFullYear() - parseInt(selectedYear) === 10 ||
            new Date().getFullYear() - parseInt(selectedYear) === 20) && (
            <div>
              <button
                type="button"
                className="btn btn-primary m-2 p-2 rounded"
                onClick={() => setShowProforma(!showProforma)}
              >
                {showProforma
                  ? "Hide Benefit Proforma"
                  : "Show Benefit Proforma"}
              </button>
              <button
                type="button"
                className="btn btn-primary m-2 p-2 rounded"
                onClick={() => setShowApplicationForm(!showApplicationForm)}
              >
                {showApplicationForm
                  ? "Hide Application Form"
                  : "Show Application Form"}
              </button>
            </div>
          )}
          {(new Date().getFullYear() - parseInt(selectedYear) === 10 ||
            new Date().getFullYear() - parseInt(selectedYear) === 20) &&
            showProforma && (
              <div className="my-5">
                <PDFDownloadLink
                  document={
                    <BenefitProforma
                      data={filteredData}
                      year={parseInt(selectedYear)}
                    />
                  }
                  fileName={`Benefit Proforma of Teachers.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: 11,
                    color: "#fff",
                    backgroundColor: "darkgreen",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                    margin: 20,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Form"
                  }
                </PDFDownloadLink>
              </div>
            )}
          {(new Date().getFullYear() - parseInt(selectedYear) === 10 ||
            new Date().getFullYear() - parseInt(selectedYear) === 20) &&
            showApplicationForm && (
              <div className="my-5">
                <PDFDownloadLink
                  document={
                    <BenefitApplication
                      data={filteredData}
                      year={parseInt(selectedYear)}
                    />
                  }
                  fileName={`Service Confirmation Form.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: 11,
                    color: "#fff",
                    backgroundColor: "darkgreen",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                    margin: 20,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Form"
                  }
                </PDFDownloadLink>
                {/* <BenefitApplication
                  data={filteredData}
                  year={parseInt(selectedYear)}
                /> */}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default YearWiseTeachers;