import React, { useEffect, useState } from "react";

const StudentTeacherRatio = () => {
  const [student, setStudent] = useState(0);
  const [teacher, setTeacher] = useState(0);
  const [showData, setShowData] = useState(false);

  useEffect(() => {}, [teacher, student]);
  return (
    <div className="container my-5">
      <form autoComplete="off">
        <div className="container">
          <div className="col-md-6 mx-auto mb-3">
            <input
              type="number"
              name="student"
              className="form-control"
              onChange={(e) => {
                if (e.target.value < 10) {
                  setShowData(false);
                } else if (e.target.value < 60) {
                  setStudent(e.target.value);
                  setTeacher(2);
                  setShowData(true);
                } else if (e.target.value < 90) {
                  setStudent(e.target.value);
                  setTeacher(3);
                  setShowData(true);
                } else if (e.target.value < 150) {
                  setStudent(e.target.value);
                  setTeacher(4);
                  setShowData(true);
                } else if (e.target.value < 200) {
                  setStudent(e.target.value);
                  setTeacher(5);
                  setShowData(true);
                } else {
                  setStudent(e.target.value);
                  setTeacher(Math.floor(student / 40));
                  setShowData(true);
                }
              }}
              placeholder="Enter Student Number"
            />
          </div>
        </div>
      </form>
      {showData ? (
        <div className="container mx-auto my-3">
          <h1 className="text-primary text-center mb-3">
            Teacher Needed:{teacher}
          </h1>
          <h1 className="text-primary text-center mb-3">
            Student Teacher Ratio is:{Math.floor(student / teacher)}
          </h1>
        </div>
      ) : null}
    </div>
  );
};

export default StudentTeacherRatio;
