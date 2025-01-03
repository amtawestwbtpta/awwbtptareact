import React, { useState } from "react";
import { useGlobalContext } from "../context/Store";
import GraduationCertificate from "./Helpers/GraduationCertificate";
import { decryptObjData } from "../modules/encryption";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default function GraduationCeremony() {
  const { resultState } = useGlobalContext();
  const [filteredData, setFilteredData] = useState(resultState);
  let teacherdetails, school;
  teacherdetails = decryptObjData("tid");
  school = teacherdetails?.school;
  return (
    <div className="container-fluid">
      <h3>Graduation Ceremony</h3>
      <div className="my-3">
        <button
          type="button"
          className="btn btn-sm m-2 btn-primary"
          onClick={() => setFilteredData(resultState)}
        >
          ALL CLASS
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-secondary"
          onClick={() =>
            setFilteredData(
              resultState.filter((student) => student.nclass === 0)
            )
          }
        >
          PRE PRIMARY
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-success"
          onClick={() =>
            setFilteredData(
              resultState.filter((student) => student.nclass === 1)
            )
          }
        >
          CLASS I
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-dark"
          onClick={() =>
            setFilteredData(
              resultState.filter((student) => student.nclass === 2)
            )
          }
        >
          CLASS II
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-info"
          onClick={() =>
            setFilteredData(
              resultState.filter((student) => student.nclass === 3)
            )
          }
        >
          CLASS III
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-warning"
          onClick={() =>
            setFilteredData(
              resultState.filter((student) => student.nclass === 4)
            )
          }
        >
          CLASS IV
        </button>
      </div>
      <PDFDownloadLink
        document={<GraduationCertificate data={filteredData} />}
        fileName={`Graduaton Ceremony Certificate of ${school}.pdf`}
        style={{
          textDecoration: "none",
          padding: "10px",
          color: "#fff",
          backgroundColor: "navy",
          border: "1px solid #4a4a4a",
          width: "40%",
          borderRadius: 10,
        }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Please Wait..." : "Download Certificate"
        }
      </PDFDownloadLink>
    </div>
  );
}
