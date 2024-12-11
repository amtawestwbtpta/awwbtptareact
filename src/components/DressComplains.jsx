import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../context/FirbaseContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import Loader from "./Loader";
import { v4 as uuid } from "uuid";
import { compareObjects } from "../modules/calculatefunctions";
const DressComplains = () => {
  const navigate = useNavigate();
  const docId = uuid();
  const [loader, setLoader] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [filteredSchoolList, setFilteredSchoolList] = useState([]);
  const [showData, setShowData] = useState(false);

  const [regComplain, setRegComplain] = useState(false);
  const [searchComplain, setSearchComplain] = useState(false);
  const [showSelectionBtn, setShowSelectionBtn] = useState(true);
  const [showSearchData, setShowSearchData] = useState(false);
  const [showEditComplainSec, setShowEditComplainSec] = useState(false);
  const [fetchedComplain, setFetchedComplain] = useState({
    id: "",
    school: "",
    udise: "",
    gp: "",
    pp: "",
    i: "",
    ii: "",
    iii: "",
    iv: "",
    v: "",
    totalStudent: "",
    problemFound: "",
    ppProblem: "",
    ppProblemDetails: "",
    iProblem: "",
    iProblemDetails: "",
    iiProblem: "",
    iiProblemDetails: "",
    iiiProblem: "",
    iiiProblemDetails: "",
    ivProblem: "",
    ivProblemDetails: "",
    vProblem: "",
    vProblemDetails: "",
    complainerName: "",
    complainerMobile: "",
    remarks: "",
    date: "",
  });
  const [orgFetchedComplain, setOrgFetchedComplain] = useState({
    id: "",
    school: "",
    udise: "",
    gp: "",
    pp: "",
    i: "",
    ii: "",
    iii: "",
    iv: "",
    v: "",
    totalStudent: "",
    problemFound: "",
    ppProblem: "",
    ppProblemDetails: "",
    iProblem: "",
    iProblemDetails: "",
    iiProblem: "",
    iiProblemDetails: "",
    iiiProblem: "",
    iiiProblemDetails: "",
    ivProblem: "",
    ivProblemDetails: "",
    vProblem: "",
    vProblemDetails: "",
    complainerName: "",
    complainerMobile: "",
    remarks: "",
    date: "",
  });
  const [inputField, setInputField] = useState({
    id: docId,
    school: "",
    udise: "",
    gp: "",
    pp: "",
    i: "",
    ii: "",
    iii: "",
    iv: "",
    v: "",
    totalStudent: "",
    problemFound: "",
    ppProblem: "",
    ppProblemDetails: "",
    iProblem: "",
    iProblemDetails: "",
    iiProblem: "",
    iiProblemDetails: "",
    iiiProblem: "",
    iiiProblemDetails: "",
    ivProblem: "",
    ivProblemDetails: "",
    vProblem: "",
    vProblemDetails: "",
    complainerName: "",
    complainerMobile: "",
    remarks: "",
    date: Date.now(),
  });
  const [errField, setErrField] = useState({
    school: "",
    udise: "",
    gp: "",
    pp: "",
    i: "",
    ii: "",
    iii: "",
    iv: "",
    v: "",
    totalStudent: "",
    problemFound: "",
    ppProblem: "",
    ppProblemDetails: "",
    iProblem: "",
    iProblemDetails: "",
    iiProblem: "",
    iiProblemDetails: "",
    iiiProblem: "",
    iiiProblemDetails: "",
    ivProblem: "",
    ivProblemDetails: "",
    vProblem: "",
    vProblemDetails: "",
    complainerName: "",
    complainerMobile: "",
    remarks: "",
  });
  const [editInputField, setEditInputField] = useState({
    id: docId,
    school: "",
    udise: "",
    gp: "",
    pp: "",
    i: "",
    ii: "",
    iii: "",
    iv: "",
    v: "",
    totalStudent: "",
    problemFound: "",
    ppProblem: "",
    ppProblemDetails: "",
    iProblem: "",
    iProblemDetails: "",
    iiProblem: "",
    iiProblemDetails: "",
    iiiProblem: "",
    iiiProblemDetails: "",
    ivProblem: "",
    ivProblemDetails: "",
    vProblem: "",
    vProblemDetails: "",
    complainerName: "",
    complainerMobile: "",
    remarks: "",
    date: Date.now(),
  });
  const [editErrField, setEditErrField] = useState({
    school: "",
    udise: "",
    gp: "",
    pp: "",
    i: "",
    ii: "",
    iii: "",
    iv: "",
    v: "",
    totalStudent: "",
    problemFound: "",
    ppProblem: "",
    ppProblemDetails: "",
    iProblem: "",
    iProblemDetails: "",
    iiProblem: "",
    iiProblemDetails: "",
    iiiProblem: "",
    iiiProblemDetails: "",
    ivProblem: "",
    ivProblemDetails: "",
    vProblem: "",
    vProblemDetails: "",
    complainerName: "",
    complainerMobile: "",
    remarks: "",
  });

  const [serInputField, setSerInputField] = useState({
    complainerName: "",
    complainerMobile: "",
  });
  const [serErrInputField, setSerErrInputField] = useState({
    complainerName: "",
    complainerMobile: "",
  });

  const searchData = async () => {
    if (validSearch()) {
      setLoader(true);
      const collectionRef = collection(firestore, "uniformComplains");
      const q = query(
        collectionRef,
        where("complainerName", "==", serInputField.complainerName)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs[0].data().pan);
      if (querySnapshot.docs.length > 0) {
        let fdata = querySnapshot.docs[0].data();
        if (serInputField.complainerMobile === fdata.complainerMobile) {
          setLoader(false);
          setShowSearchData(true);
          setFetchedComplain(fdata);
          setOrgFetchedComplain(fdata);
          toast.success(
            `Congratulation ${serInputField.complainerName}, Your Complain Found In Our DataBase!`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } else {
          setLoader(false);
          toast.error(
            `Congratulation ${serInputField.complainerName}, Your Complain Found But Mobile Number Mismatched!`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      } else {
        setLoader(false);
        toast.error(`Invalid Name`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setLoader(false);
      toast.error(`Invalid Form`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const validSearch = () => {
    let formIsValid = true;
    setSerErrInputField({
      complainerName: "",
      complainerMobile: "",
    });
    if (serInputField.complainerName === "") {
      formIsValid = false;
      setSerErrInputField((prevState) => ({
        ...prevState,
        complainerName: "Please Enter Valid Name",
      }));
    }
    if (serInputField.complainerMobile === "") {
      formIsValid = false;
      setSerErrInputField((prevState) => ({
        ...prevState,
        complainerMobile: "Please Enter Valid Name",
      }));
    }
    return formIsValid;
  };

  const submitComplain = async (e) => {
    e.preventDefault();
    if (validForm()) {
      console.log(inputField);
      try {
        setLoader(true);

        await setDoc(doc(firestore, "uniformComplains", docId), inputField);
        setLoader(false);
        toast.success(
          `Congratulation ${inputField.complainerName}, Uniform Complain of ${inputField.school} is Successfully Registered!`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (e) {
        setLoader(false);
        console.log(e);
        toast.error("Teacher Entry Failed", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setLoader(false);
      toast.error(`Invalid Form`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      school: "",
      udise: "",
      gp: "",
      pp: "",
      i: "",
      ii: "",
      iii: "",
      iv: "",
      v: "",
      totalStudent: "",
      problemFound: "",
      ppProblem: "",
      ppProblemDetails: "",
      iProblem: "",
      iProblemDetails: "",
      iiProblem: "",
      iiProblemDetails: "",
      iiiProblem: "",
      iiiProblemDetails: "",
      ivProblem: "",
      ivProblemDetails: "",
      vProblem: "",
      vProblemDetails: "",
      complainerName: "",
      complainerMobile: "",
      remarks: "",
    });
    if (inputField.complainerName === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        complainerName: "Please Enter Valid Name",
      }));
    }
    if (inputField.complainerMobile === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        complainerMobile: "Please Enter Valid Mobile Number",
      }));
    }
    if (inputField.pp === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        pp: "Please Enter Valid Number of PP Students",
      }));
    }

    if (inputField.i === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        i: "Please Enter Valid Number of Class I Students",
      }));
    }

    if (inputField.ii === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        ii: "Please Enter Valid Number of Class II Students",
      }));
    }

    if (inputField.iii === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        iii: "Please Enter Valid Number of Class III Students",
      }));
    }

    if (inputField.iv === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        iv: "Please Enter Valid Number of Class IV Students",
      }));
    }

    if (inputField.v > 0 && inputField.v === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        v: "Please Enter Valid Number of Class V Students",
      }));
    }

    if (inputField.totalStudent === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        totalStudent: "Please Enter Valid Number of Total Students",
      }));
    }
    if (inputField.problemFound === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        problemFound: "Please Enter Valid Number of Problemed Total Students",
      }));
    }

    return formIsValid;
  };
  const editValidForm = () => {
    let formIsValid = true;
    setEditErrField({
      school: "",
      udise: "",
      gp: "",
      pp: "",
      i: "",
      ii: "",
      iii: "",
      iv: "",
      v: "",
      totalStudent: "",
      problemFound: "",
      ppProblem: "",
      ppProblemDetails: "",
      iProblem: "",
      iProblemDetails: "",
      iiProblem: "",
      iiProblemDetails: "",
      iiiProblem: "",
      iiiProblemDetails: "",
      ivProblem: "",
      ivProblemDetails: "",
      vProblem: "",
      vProblemDetails: "",
      complainerName: "",
      complainerMobile: "",
      remarks: "",
    });
    if (editInputField.complainerName === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        complainerName: "Please Enter Valid Name",
      }));
    }
    if (editInputField.complainerMobile === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        complainerMobile: "Please Enter Valid Mobile Number",
      }));
    }
    if (editInputField.pp === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        pp: "Please Enter Valid Number of PP Students",
      }));
    }

    if (editInputField.i === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        i: "Please Enter Valid Number of Class I Students",
      }));
    }

    if (editInputField.ii === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        ii: "Please Enter Valid Number of Class II Students",
      }));
    }

    if (editInputField.iii === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        iii: "Please Enter Valid Number of Class III Students",
      }));
    }

    if (editInputField.iv === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        iv: "Please Enter Valid Number of Class IV Students",
      }));
    }

    if (editInputField.v > 0 && editInputField.v === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        v: "Please Enter Valid Number of Class V Students",
      }));
    }

    if (editInputField.totalStudent === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        totalStudent: "Please Enter Valid Number of Total Students",
      }));
    }
    if (editInputField.problemFound === "") {
      formIsValid = false;
      setEditErrField((prevState) => ({
        ...prevState,
        problemFound: "Please Enter Valid Number of Problemed Total Students",
      }));
    }

    return formIsValid;
  };

  const editSubmitData = async (e) => {
    e.preventDefault();
    if (editValidForm()) {
      if (!compareObjects(editInputField, orgFetchedComplain)) {
        const docRef = doc(
          firestore,
          "uniformComplains",
          orgFetchedComplain.id
        );
        await updateDoc(docRef, editInputField).then(() => {
          toast.success(
            `Congratulation ${editInputField.complainerName}, Uniform Complain of ${editInputField.school} is Successfully Registered!`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        });
      } else {
        setLoader(false);
        toast.error(`Nothing Changed`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setLoader(false);
      toast.error(`Invalid Form`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const userData = async () => {
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/schools.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setSchoolList(data);
        setFilteredSchoolList(data);
      });
  };
  useEffect(() => {
    userData();
    document.title = "WBTPTA AMTA WEST:UNIFORM COMPLAIN REGISTER SECTION";
  }, []);
  useEffect(() => {}, [fetchedComplain, orgFetchedComplain, editInputField]);
  return (
    <div className="container my-5">
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      {loader ? <Loader /> : null}
      <h3 className="text-center text-primary timesFont">
        WBTPTA AMTA WEST CIRCLE SCHOOL UNIFORM COMPLAIN REGISTER SECTION
      </h3>
      <div className="container mt-3">
        {showSelectionBtn ? (
          <div>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => {
                setShowSelectionBtn(false);
                setRegComplain(true);
              }}
            >
              Register Complain
            </button>
            <button
              type="button"
              className="btn btn-warning m-1"
              onClick={() => {
                setShowSelectionBtn(false);
                setSearchComplain(true);
              }}
            >
              Search / Edit Complain
            </button>
          </div>
        ) : (
          <button
            type="button"
            className=" btn btn-danger mb-3"
            onClick={() => {
              setShowSelectionBtn(true);
              setSearchComplain(false);
              setRegComplain(false);

              setShowData(false);
              setInputField({
                school: "",
                udise: "",
                gp: "",
                pp: "",
                i: "",
                ii: "",
                iii: "",
                iv: "",
                v: "",
                totalStudent: "",
                problemFound: "",
                ppProblem: "",
                ppProblemDetails: "",
                iProblem: "",
                iProblemDetails: "",
                iiProblem: "",
                iiProblemDetails: "",
                iiiProblem: "",
                iiiProblemDetails: "",
                ivProblem: "",
                ivProblemDetails: "",
                vProblem: "",
                vProblemDetails: "",
                complainerName: "",
                complainerMobile: "",
                remarks: "",
              });
              setShowSearchData(false);
              setSerInputField({
                complainerName: "",
                complainerMobile: "",
              });
            }}
          >
            Cancel
          </button>
        )}

        {regComplain && (
          <div className="col-md-6 mx-auto mb-3">
            <select
              className="form-select"
              defaultValue=""
              id="selectData"
              onChange={(e) => {
                setShowData(true);
                let selectedSchool = schoolList.filter((el) =>
                  el.udise.match(e.target.value)
                )[0];
                setFilteredSchoolList(
                  schoolList.filter((el) => el.udise.match(e.target.value))
                );
                setInputField({
                  ...inputField,
                  school: selectedSchool.school,
                  gp: selectedSchool.gp,
                  udise: selectedSchool.udise,
                  pp: selectedSchool.pp,
                  i: selectedSchool.i,
                  ii: selectedSchool.ii,
                  iii: selectedSchool.iii,
                  iv: selectedSchool.iv,
                  v: selectedSchool.v,
                  totalStudent: selectedSchool.total_student,
                });
              }}
              aria-label="Default select example"
            >
              <option value="">Select School Name</option>
              {schoolList.length > 0
                ? schoolList.map((el) => {
                    return (
                      <option key={el.id} value={el.udise}>
                        {el.school}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
        )}
      </div>
      {showData ? (
        <>
          <div className="container my-3 mx-auto">
            <div className="row my-3">
              <div className="col-md-4">
                <h4 className="text-primary text center">
                  SCHOOL NAME: {filteredSchoolList[0].school}
                </h4>
              </div>
              <div className="col-md-4">
                <h4 className="text-primary text center">
                  GP NAME: {filteredSchoolList[0].gp}
                </h4>
              </div>
              <div className="col-md-4">
                <h4 className="text-primary text center">
                  UDISE: {filteredSchoolList[0].udise}
                </h4>
              </div>
            </div>
          </div>
          <div className="row m-auto col-md-6 login p-2">
            <form method="post" onSubmit={submitComplain}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-control"
                  value={inputField.complainerName}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      complainerName: e.target.value,
                    })
                  }
                />
                {errField.complainerName.length > 0 && (
                  <span className="error">{errField.complainerName}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Your Mobile No
                </label>
                <input
                  type="number"
                  placeholder="Enter Your Mobile Number"
                  className="form-control"
                  value={inputField.complainerMobile}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      complainerMobile: e.target.value,
                    })
                  }
                />
                {errField.complainerMobile.length > 0 && (
                  <span className="error">{errField.complainerMobile}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number of PP Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Of PP Students"
                  className="form-control"
                  value={inputField.pp}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      pp: e.target.value,
                    })
                  }
                />
                {errField.pp.length > 0 && (
                  <span className="error">{errField.pp}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number Problems Found in PP Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Problems Found in PP Students"
                  className="form-control"
                  value={inputField.ppProblem}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      ppProblem: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Brief Details of PP Students Problem
                </label>
                <textarea
                  cols="5"
                  rows="7"
                  className="form-control"
                  placeholder="Enter Brief Details of PP Students Problem"
                  style={{ resize: "none" }}
                  value={inputField.ppProblemDetails}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      ppProblemDetails: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number of Class I Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Of Class I Students"
                  className="form-control"
                  value={inputField.i}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      i: e.target.value,
                    })
                  }
                />
                {errField.i.length > 0 && (
                  <span className="error">{errField.i}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number Problems Found in Class I Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Problems Found in Class I Students"
                  className="form-control"
                  value={inputField.iProblem}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iProblem: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Brief Details of Class I Students Problem
                </label>
                <textarea
                  cols="5"
                  rows="7"
                  className="form-control"
                  placeholder="Enter Brief Details of Class I Students Problem"
                  style={{ resize: "none" }}
                  value={inputField.iProblemDetails}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iProblemDetails: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number of Class II Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Of Class II Students"
                  className="form-control"
                  value={inputField.ii}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      ii: e.target.value,
                    })
                  }
                />
                {errField.ii.length > 0 && (
                  <span className="error">{errField.ii}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number Problems Found in Class II Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Problems Found in Class II Students"
                  className="form-control"
                  value={inputField.iiProblem}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iiProblem: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Brief Details of Class II Students Problem
                </label>
                <textarea
                  cols="5"
                  rows="7"
                  className="form-control"
                  placeholder="Enter Brief Details of Class II Students Problem"
                  style={{ resize: "none" }}
                  value={inputField.iiProblemDetails}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iiProblemDetails: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number of Class III Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Of Class III Students"
                  className="form-control"
                  value={inputField.iii}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iii: e.target.value,
                    })
                  }
                />
                {errField.iii.length > 0 && (
                  <span className="error">{errField.iii}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number Problems Found in Class III Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Problems Found in Class III Students"
                  className="form-control"
                  value={inputField.iiiProblem}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iiiProblem: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Brief Details of Class III Students Problem
                </label>
                <textarea
                  cols="5"
                  rows="7"
                  className="form-control"
                  placeholder="Enter Brief Details of Class III Students Problem"
                  style={{ resize: "none" }}
                  value={inputField.iiiProblemDetails}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iiiProblemDetails: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number of Class IV Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Of Class IV Students"
                  className="form-control"
                  value={inputField.iv}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      iv: e.target.value,
                    })
                  }
                />
                {errField.iv.length > 0 && (
                  <span className="error">{errField.iv}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number Problems Found in Class IV Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Problems Found in Class IV Students"
                  className="form-control"
                  value={inputField.ivProblem}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      ivProblem: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Brief Details of Class IV Students Problem
                </label>
                <textarea
                  cols="5"
                  rows="7"
                  className="form-control"
                  placeholder="Enter Brief Details of Class IV Students Problem"
                  style={{ resize: "none" }}
                  value={inputField.ivProblemDetails}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      ivProblemDetails: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              {inputField.v > 0 && (
                <>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Total Number of Class V Students
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Total Number Of Class V Students"
                      className="form-control"
                      value={inputField.v}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          v: e.target.value,
                        })
                      }
                    />
                    {errField.v.length > 0 && (
                      <span className="error">{errField.v}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Total Number Problems Found in Class V Students
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Total Number Problems Found in Class V Students"
                      className="form-control"
                      value={inputField.vProblem}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          vProblem: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Brief Details of Class V Students Problem
                    </label>
                    <textarea
                      cols="5"
                      rows="7"
                      className="form-control"
                      placeholder="Enter Brief Details of Class V Students Problem"
                      style={{ resize: "none" }}
                      value={inputField.vProblemDetails}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          vProblemDetails: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </>
              )}
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number of Students
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Of Students"
                  className="form-control"
                  value={inputField.totalStudent}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      totalStudent: e.target.value,
                    })
                  }
                />
                {errField.totalStudent.length > 0 && (
                  <span className="error">{errField.totalStudent}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Total Number Problems Found
                </label>
                <input
                  type="number"
                  placeholder="Enter Total Number Problems Found"
                  className="form-control"
                  value={inputField.problemFound}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      problemFound: e.target.value,
                    })
                  }
                />
                {errField.problemFound.length > 0 && (
                  <span className="error">{errField.problemFound}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Any Other Remarks
                </label>
                <textarea
                  cols="5"
                  rows="7"
                  className="form-control"
                  placeholder="Enter If Any Other Remarks"
                  style={{ resize: "none" }}
                  value={inputField.remarks}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      remarks: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary m-1"
                  onClick={submitComplain}
                >
                  Submit Complain <i className="bi bi-box-arrow-in-left"></i>
                </button>
                <button
                  type="reset"
                  className="btn btn-danger m-1"
                  onClick={() => {
                    document.getElementById("selectData").value = "";
                    setShowData(false);
                    setInputField({
                      school: "",
                      udise: "",
                      gp: "",
                      pp: "",
                      i: "",
                      ii: "",
                      iii: "",
                      iv: "",
                      v: "",
                      totalStudent: "",
                      problemFound: "",
                      ppProblem: "",
                      ppProblemDetails: "",
                      iProblem: "",
                      iProblemDetails: "",
                      iiProblem: "",
                      iiProblemDetails: "",
                      iiiProblem: "",
                      iiiProblemDetails: "",
                      ivProblem: "",
                      ivProblemDetails: "",
                      vProblem: "",
                      vProblemDetails: "",
                      complainerName: "",
                      complainerMobile: "",
                      remarks: "",
                    });
                  }}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}

      {searchComplain && (
        <div className="container col-md-6">
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="form-control"
              value={serInputField.complainerName}
              onChange={(e) =>
                setSerInputField({
                  ...serInputField,
                  complainerName: e.target.value,
                })
              }
            />
            {serErrInputField.complainerName.length > 0 && (
              <span className="error">{serErrInputField.complainerName}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Your Mobile No.
            </label>
            <input
              type="number"
              placeholder="Enter Your Mobile No."
              className="form-control"
              value={serInputField.complainerMobile}
              onChange={(e) =>
                setSerInputField({
                  ...serInputField,
                  complainerMobile: e.target.value,
                })
              }
            />
            {serErrInputField.complainerMobile.length > 0 && (
              <span className="error">{serErrInputField.complainerMobile}</span>
            )}
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={searchData}
            >
              Search Complain
            </button>
          </div>
        </div>
      )}
      {showSearchData && (
        <div className="container">
          <div className="mb-3">
            <h5 className="text-center">
              Complainer's Name: {fetchedComplain.complainerName}
            </h5>

            <h5 className="text-center">
              School name: {fetchedComplain.school}
            </h5>

            <h5 className="text-center">
              Complainer's Mobile No.: {fetchedComplain.complainerMobile}
            </h5>
            <h5 className="text-center">
              Total Number of PP Students: {fetchedComplain.pp}
            </h5>
            {fetchedComplain.ppProblem && (
              <h5 className="text-center">
                Total Number Problems Found in PP Students:{" "}
                {fetchedComplain.ppProblem}
              </h5>
            )}
            {fetchedComplain.ppProblemDetails && (
              <h5 className="text-center">
                Brief Details of PP Students Problem:{" "}
                {fetchedComplain.ppProblemDetails}
              </h5>
            )}
            {fetchedComplain.i && (
              <h5 className="text-center">
                Total Number of Class I Students: {fetchedComplain.i}
              </h5>
            )}
            {fetchedComplain.iProblem && (
              <h5 className="text-center">
                Total Number Problems Found in Class I Students:{" "}
                {fetchedComplain.iProblem}
              </h5>
            )}
            {fetchedComplain.iProblemDetails && (
              <h5 className="text-center">
                Brief Details of Class I Students Problem:{" "}
                {fetchedComplain.iProblemDetails}
              </h5>
            )}
            {fetchedComplain.ii && (
              <h5 className="text-center">
                Total Number of Class II Students: {fetchedComplain.ii}
              </h5>
            )}
            {fetchedComplain.iiProblem && (
              <h5 className="text-center">
                Total Number Problems Found in Class II Students:{" "}
                {fetchedComplain.iiProblem}
              </h5>
            )}
            {fetchedComplain.iiProblemDetails && (
              <h5 className="text-center">
                Brief Details of Class II Students Problem:{" "}
                {fetchedComplain.iiProblemDetails}
              </h5>
            )}
            {fetchedComplain.iii && (
              <h5 className="text-center">
                Total Number of Class III Students: {fetchedComplain.iii}
              </h5>
            )}
            {fetchedComplain.iiiProblem && (
              <h5 className="text-center">
                Total Number Problems Found in Class III Students:{" "}
                {fetchedComplain.iiiProblem}
              </h5>
            )}
            {fetchedComplain.iiiProblemDetails && (
              <h5 className="text-center">
                Brief Details of Class III Students Problem:{" "}
                {fetchedComplain.iiiProblemDetails}
              </h5>
            )}
            {fetchedComplain.iv && (
              <h5 className="text-center">
                Total Number of Class IV Students: {fetchedComplain.iv}
              </h5>
            )}
            {fetchedComplain.ivProblem && (
              <h5 className="text-center">
                Total Number Problems Found in Class IV Students:{" "}
                {fetchedComplain.ivProblem}
              </h5>
            )}
            {fetchedComplain.ivProblemDetails && (
              <h5 className="text-center">
                Brief Details of Class IV Students Problem:{" "}
                {fetchedComplain.ivProblemDetails}
              </h5>
            )}

            {fetchedComplain.v ? (
              <>
                <h5 className="text-center">
                  Total Number of Class V Students: {fetchedComplain.v}
                </h5>
                <h5 className="text-center">
                  Total Number Problems Found in Class V Students:{" "}
                  {fetchedComplain.vProblem}
                </h5>
                <h5 className="text-center">
                  Brief Details of Class V Students Problem:{" "}
                  {fetchedComplain.vProblemDetails}
                </h5>
              </>
            ) : null}
            <h5 className="text-center">
              Total Number of Students: {fetchedComplain.totalStudent}
            </h5>
            <h5 className="text-center">
              Total Number Problems Found: {fetchedComplain.problemFound}
            </h5>

            {fetchedComplain.remarks ? (
              <>
                <h5 className="text-center">
                  Total Number Problems Found: {fetchedComplain.remarks}
                </h5>
              </>
            ) : null}

            <div className="my-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowEditComplainSec(true);
                  setEditInputField(fetchedComplain);
                }}
              >
                Edit Complain
              </button>
              <button
                type="button"
                className="btn btn-danger mx-3"
                onClick={() => {
                  setShowSearchData(false);
                  setSerInputField({
                    complainerName: "",
                    complainerMobile: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
            <div className="my-3">
              {showEditComplainSec ? (
                <>
                  <div className="row m-auto col-md-6 login p-2">
                    <form method="post" onSubmit={editSubmitData}>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          className="form-control"
                          value={editInputField.complainerName}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              complainerName: e.target.value,
                            })
                          }
                        />
                        {editErrField.complainerName.length > 0 && (
                          <span className="error">
                            {editErrField.complainerName}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Your Mobile No
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Your Mobile Number"
                          className="form-control"
                          value={editInputField.complainerMobile}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              complainerMobile: e.target.value,
                            })
                          }
                        />
                        {editErrField.complainerMobile.length > 0 && (
                          <span className="error">
                            {editErrField.complainerMobile}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number of PP Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Of PP Students"
                          className="form-control"
                          value={editInputField.pp}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              pp: e.target.value,
                            })
                          }
                        />
                        {editErrField.pp.length > 0 && (
                          <span className="error">{editErrField.pp}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number Problems Found in PP Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Problems Found in PP Students"
                          className="form-control"
                          value={editInputField.ppProblem}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              ppProblem: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brief Details of PP Students Problem
                        </label>
                        <textarea
                          cols="5"
                          rows="7"
                          className="form-control"
                          placeholder="Enter Brief Details of PP Students Problem"
                          style={{ resize: "none" }}
                          value={editInputField.ppProblemDetails}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              ppProblemDetails: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number of Class I Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Of Class I Students"
                          className="form-control"
                          value={editInputField.i}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              i: e.target.value,
                            })
                          }
                        />
                        {editErrField.i.length > 0 && (
                          <span className="error">{editErrField.i}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number Problems Found in Class I Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Problems Found in Class I Students"
                          className="form-control"
                          value={editInputField.iProblem}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iProblem: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brief Details of Class I Students Problem
                        </label>
                        <textarea
                          cols="5"
                          rows="7"
                          className="form-control"
                          placeholder="Enter Brief Details of Class I Students Problem"
                          style={{ resize: "none" }}
                          value={editInputField.iProblemDetails}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iProblemDetails: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number of Class II Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Of Class II Students"
                          className="form-control"
                          value={editInputField.ii}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              ii: e.target.value,
                            })
                          }
                        />
                        {editErrField.ii.length > 0 && (
                          <span className="error">{editErrField.ii}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number Problems Found in Class II Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Problems Found in Class II Students"
                          className="form-control"
                          value={editInputField.iiProblem}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iiProblem: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brief Details of Class II Students Problem
                        </label>
                        <textarea
                          cols="5"
                          rows="7"
                          className="form-control"
                          placeholder="Enter Brief Details of Class II Students Problem"
                          style={{ resize: "none" }}
                          value={editInputField.iiProblemDetails}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iiProblemDetails: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number of Class III Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Of Class III Students"
                          className="form-control"
                          value={editInputField.iii}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iii: e.target.value,
                            })
                          }
                        />
                        {editErrField.iii.length > 0 && (
                          <span className="error">{editErrField.iii}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number Problems Found in Class III Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Problems Found in Class III Students"
                          className="form-control"
                          value={editInputField.iiiProblem}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iiiProblem: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brief Details of Class III Students Problem
                        </label>
                        <textarea
                          cols="5"
                          rows="7"
                          className="form-control"
                          placeholder="Enter Brief Details of Class III Students Problem"
                          style={{ resize: "none" }}
                          value={editInputField.iiiProblemDetails}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iiiProblemDetails: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number of Class IV Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Of Class IV Students"
                          className="form-control"
                          value={editInputField.iv}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              iv: e.target.value,
                            })
                          }
                        />
                        {editErrField.iv.length > 0 && (
                          <span className="error">{editErrField.iv}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number Problems Found in Class IV Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Problems Found in Class IV Students"
                          className="form-control"
                          value={editInputField.ivProblem}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              ivProblem: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brief Details of Class IV Students Problem
                        </label>
                        <textarea
                          cols="5"
                          rows="7"
                          className="form-control"
                          placeholder="Enter Brief Details of Class IV Students Problem"
                          style={{ resize: "none" }}
                          value={editInputField.ivProblemDetails}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              ivProblemDetails: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      {editInputField.v > 0 && (
                        <>
                          <div className="mb-3">
                            <label htmlFor="" className="form-label">
                              Total Number of Class V Students
                            </label>
                            <input
                              type="number"
                              placeholder="Enter Total Number Of Class V Students"
                              className="form-control"
                              value={editInputField.v}
                              onChange={(e) =>
                                setEditInputField({
                                  ...editInputField,
                                  v: e.target.value,
                                })
                              }
                            />
                            {editErrField.v.length > 0 && (
                              <span className="error">{editErrField.v}</span>
                            )}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="" className="form-label">
                              Total Number Problems Found in Class V Students
                            </label>
                            <input
                              type="number"
                              placeholder="Enter Total Number Problems Found in Class V Students"
                              className="form-control"
                              value={editInputField.vProblem}
                              onChange={(e) =>
                                setEditInputField({
                                  ...editInputField,
                                  vProblem: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="" className="form-label">
                              Brief Details of Class V Students Problem
                            </label>
                            <textarea
                              cols="5"
                              rows="7"
                              className="form-control"
                              placeholder="Enter Brief Details of Class V Students Problem"
                              style={{ resize: "none" }}
                              value={editInputField.vProblemDetails}
                              onChange={(e) =>
                                setEditInputField({
                                  ...editInputField,
                                  vProblemDetails: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>
                        </>
                      )}
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number of Students
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Of Students"
                          className="form-control"
                          value={editInputField.totalStudent}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              totalStudent: e.target.value,
                            })
                          }
                        />
                        {editErrField.totalStudent.length > 0 && (
                          <span className="error">
                            {editErrField.totalStudent}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Total Number Problems Found
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Total Number Problems Found"
                          className="form-control"
                          value={editInputField.problemFound}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              problemFound: e.target.value,
                            })
                          }
                        />
                        {editErrField.problemFound.length > 0 && (
                          <span className="error">
                            {editErrField.problemFound}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Any Other Remarks
                        </label>
                        <textarea
                          cols="5"
                          rows="7"
                          className="form-control"
                          placeholder="Enter If Any Other Remarks"
                          style={{ resize: "none" }}
                          value={editInputField.remarks}
                          onChange={(e) =>
                            setEditInputField({
                              ...editInputField,
                              remarks: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary m-1"
                          onClick={editSubmitData}
                        >
                          Submit Complain{" "}
                          <i className="bi bi-box-arrow-in-left"></i>
                        </button>
                        <button
                          type="reset"
                          className="btn btn-danger m-1"
                          onClick={() => {
                            setShowSelectionBtn(true);
                            setSearchComplain(false);
                            setRegComplain(false);

                            setShowData(false);
                            setEditInputField({
                              school: "",
                              udise: "",
                              gp: "",
                              pp: "",
                              i: "",
                              ii: "",
                              iii: "",
                              iv: "",
                              v: "",
                              totalStudent: "",
                              problemFound: "",
                              ppProblem: "",
                              ppProblemDetails: "",
                              iProblem: "",
                              iProblemDetails: "",
                              iiProblem: "",
                              iiProblemDetails: "",
                              iiiProblem: "",
                              iiiProblemDetails: "",
                              ivProblem: "",
                              ivProblemDetails: "",
                              vProblem: "",
                              vProblemDetails: "",
                              complainerName: "",
                              complainerMobile: "",
                              remarks: "",
                            });
                            setShowSearchData(false);
                            setSerInputField({
                              complainerName: "",
                              complainerMobile: "",
                            });
                          }}
                        >
                          Reset Form
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DressComplains;
