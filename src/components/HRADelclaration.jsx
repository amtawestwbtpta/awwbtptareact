import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/Store";
import { Loader } from "rsuite";
import { IndianFormat } from "../modules/calculatefunctions";
export default function HRADelclaration() {
  const { teachersState } = useGlobalContext();
  const [wbtptaTeachers, setWbtptaTeachers] = useState([]);
  const [january, setJanuary] = useState([]);
  const [loader, setLoader] = useState(false);

  const getSalary = async () => {
    setLoader(true);
    const q1 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/january.json"
    );
    setJanuary(q1.data);
    setWbtptaTeachers(
      teachersState.filter((teacher) => teacher.association === "WBTPTA")
    );
    setLoader(false);
  };
  useEffect(() => {
    getSalary();
    document.title = `JANUARY HRA Declaration of WBTPTA Teachers Year ${new Date().getFullYear()}`;
    // eslint-disable-next-line
  }, [january]);
  return (
    <div className="container-fluid">
      {loader && <Loader />}
      <div className="mx-auto">
        <h3 className="text-center">
          HRA of All WBTPTA Teachers under Amta West Circle for the Month of
          January, {new Date().getFullYear()}
        </h3>
        <button
          type="button"
          className="btn btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
        <table
          style={{
            border: "1px solid",
            textAlign: "center",
            width: "100%",
          }}
          className="container-fluid myTable"
        >
          <thead
            style={{
              border: "1px solid",
              textAlign: "center",
            }}
          >
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                SL
              </th>

              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                School
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                Basic Pay
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                HRA
              </th>
            </tr>
          </thead>
          <tbody
            style={{
              border: "1px solid",
              textAlign: "center",
            }}
          >
            {wbtptaTeachers.map((teacher, index) => {
              const januarySalary = january.filter(
                (el) => el.id === teacher.id
              )[0];
              const januaryBasic = januarySalary?.basic;
              const januaryHRA = Math.round(
                januarySalary?.basic * januarySalary?.hraPercent
              );
              if (januaryBasic !== 0) {
                return (
                  <tr key={index}>
                    <td style={{ border: "1px solid", textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid", textAlign: "center" }}>
                      {teacher?.school}
                    </td>
                    <td style={{ border: "1px solid", textAlign: "center" }}>
                      {teacher?.tname}
                    </td>
                    <td style={{ border: "1px solid", textAlign: "center" }}>
                    ₹ {IndianFormat(januaryBasic)}
                    </td>
                    <td style={{ border: "1px solid", textAlign: "center" }}>
                    ₹ {IndianFormat(januaryHRA)}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
        onClick={() => {
          window.print();
        }}
      >
        Print
      </button>
    </div>
  );
}
