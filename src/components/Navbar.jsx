import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  decryptAuthCookie,
  decryptObjData,
  getCookie,
} from "../modules/encryption";
import { firestore } from "../context/FirbaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";
import axios from "axios";
const Navbar = () => {
  const {
    state,
    setState,
    teachersState,
    setTeachersState,
    schoolState,
    setSchoolState,
    teacherUpdateTime,
    setTeacherUpdateTime,
    schoolUpdateTime,
    setSchoolUpdateTime,
    setStateObject,
    setMemoUpdateTime,
    setNoticeUpdateTime,
    setQuestionUpdateTime,
    setSlideUpdateTime,
    setStateArray,
    questionRateState,
    questionRateUpdateTime,
    setQuestionRateState,
    setQuestionRateUpdateTime,
    setUSER,
  } = useGlobalContext();
  const navigate = useNavigate();
  // let navbarSupportedContent = document.querySelector(
  //   "#navbarSupportedContent"
  // );

  const [showLoader, setShowLoader] = useState(false);
  const handleNavCollapse = () => {
    if (
      document
        .querySelector("#navbarSupportedContent")
        .classList.contains("show")
    ) {
      document
        .querySelector("#navbarSupportedContent")
        .classList.remove("show");
    }
  };

  const storeTeachersData = async () => {
    setShowLoader(true);
    let data = [];
    try {
      const q = query(collection(firestore, "teachers"));
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      console.error("Error fetching teachers data: ", error);
      const url = `https://awwbtpta.vercel.app/api/getTeachers`;
      const response = await axios.post(url);
      data = response.data.data;
    }

    const newDatas = data.sort((a, b) => {
      // First, compare the "school" keys
      if (a.school < b.school) {
        return -1;
      }
      if (a.school > b.school) {
        return 1;
      }
      // If "school" keys are equal, compare the "rank" keys
      return a.rank - b.rank;
    });
    setShowLoader(false);
    setTeachersState(newDatas);
    setTeacherUpdateTime(Date.now());
  };
  const storeSchoolData = async () => {
    setShowLoader(true);
    let data = [];
    try {
      const q = query(collection(firestore, "schools"));

      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      const url = `https://awwbtpta.vercel.app/api/getSchools`;
      const response = await axios.post(url);
      data = response.data.data;
    }
    setSchoolState(data);
    setSchoolUpdateTime(Date.now());
    setShowLoader(false);
  };

  const getAcceptingData = async () => {
    setShowLoader(true);
    let data = [];
    try {
      const q = query(collection(firestore, "question_rate"));
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))[0];
    } catch (error) {
      console.error("Error fetching accepting data: ", error);
      const url = `https://awwbtpta.vercel.app/api/getQuestionRate`;
      const response = await axios.post(url);
      data = response.data.data;
    }
    setQuestionRateState(data);
    setQuestionRateUpdateTime(Date.now());
    setShowLoader(false);
  };

  let teacherdetails, userdetails;
  let details = getCookie("tid");
  const [question, setQuestion] = useState("");
  const setCookieData = () => {
    if (details) {
      teacherdetails = decryptObjData("tid");
      userdetails = decryptObjData("uid");
      setQuestion(userdetails.question);
      if (decryptAuthCookie()) {
        setState(teacherdetails?.circle);
      } else {
        checkLogin();
      }
    }
  };
  const checkLogin = async () => {
    if (details) {
      setShowLoader(true);

      let data = [];
      try {
        const collectionRef = collection(firestore, "userteachers");
        const q = query(
          collectionRef,
          where("username", "==", userdetails?.username)
        );
        const querySnapshot = await getDocs(q);
        data = querySnapshot.docs[0]?.data();
      } catch (error) {
        console.error("Error fetching user data: ", error);
        const url = `https://awwbtpta.vercel.app/api/getUser`;
        const response = await axios.post(url, {
          username: userdetails?.username,
        });
        data = response.data.data;
      }
      if (!data?.disabled) {
        setState(data?.circle);
        setUSER(data);
        setQuestion(data?.question);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.error("Your Account is Disabled!");
        navigate("/logout");
      }
    }
  };
  useEffect(() => {
    setCookieData();
    const teacherDifference = (Date.now() - teacherUpdateTime) / 1000 / 60 / 15;
    if (teacherDifference >= 1 || teachersState.length === 0) {
      storeTeachersData();
    }
    const schDifference = (Date.now() - schoolUpdateTime) / 1000 / 60 / 15;
    if (schDifference >= 1 || schoolState.length === 0) {
      storeSchoolData();
    }
    const questionRateDifference =
      (Date.now() - questionRateUpdateTime) / 1000 / 60 / 15;
    if (questionRateDifference >= 1 || questionRateState.length === 0) {
      getAcceptingData();
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setCookieData();
    const teacherDifference = (Date.now() - teacherUpdateTime) / 1000 / 60 / 15;
    if (teacherDifference >= 1 || teachersState.length === 0) {
      storeTeachersData();
    }
    const schDifference = (Date.now() - schoolUpdateTime) / 1000 / 60 / 15;
    if (schDifference >= 1 || schoolState.length === 0) {
      storeSchoolData();
    }
    const questionRateDifference =
      (Date.now() - questionRateUpdateTime) / 1000 / 60 / 15;
    if (questionRateDifference >= 1 || questionRateState.length === 0) {
      getAcceptingData();
    }

    // eslint-disable-next-line
  }, []);

  const RenderMenu = () => {
    if (state === "admin") {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/home"
              onClick={handleNavCollapse}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/dashboard"
              onClick={handleNavCollapse}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/FloodRelief"
              onClick={handleNavCollapse}
            >
              Flood Relief
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/findteacher"
              onClick={handleNavCollapse}
            >
              Search Teacher
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/StudentTeacherRatio"
              onClick={handleNavCollapse}
            >
              Student Teacher Ratio
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/schoolteacherdata"
              onClick={handleNavCollapse}
            >
              School Teacher Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/techsalary"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === decryptObjData("tid")?.udise
                  )
                );
              }}
            >
              All Teacher's Salary Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/TechAccuitance"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === decryptObjData("tid")?.udise
                  )
                );
              }}
            >
              Acquittance Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/payslipwbtpta"
              onClick={() => {
                handleNavCollapse();
                setStateObject(decryptObjData("tid"));
              }}
            >
              Generate Payslip
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Form16Prev"
              onClick={() => {
                handleNavCollapse();
                setStateObject(decryptObjData("tid"));
              }}
            >
              Generate Own Form 16
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/teacherAddress"
              onClick={handleNavCollapse}
            >
              Teacher Address
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/gpwiseschool"
              onClick={handleNavCollapse}
            >
              GP Wise School Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/GPWiseTeacher"
              onClick={handleNavCollapse}
            >
              GP Wise Teacher Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/teacherdatabase"
              onClick={handleNavCollapse}
            >
              All Teacher's Data of AW Circle
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/ITSection"
              onClick={handleNavCollapse}
            >
              IT Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/TeacherServiceLife"
              onClick={handleNavCollapse}
            >
              Teacher Service Life
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/YearWiseTeachers"
              onClick={handleNavCollapse}
            >
              Year Wise Teachers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Retirement"
              onClick={handleNavCollapse}
            >
              Retirement Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/displaydatabase"
              onClick={handleNavCollapse}
            >
              Display Registered Users Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/questionsec"
              onClick={handleNavCollapse}
            >
              Question Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/result"
              onClick={handleNavCollapse}
            >
              Result Section
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/AddTeacher"
              onClick={handleNavCollapse}
            >
              Add Teacher
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/admindashboard"
              onClick={handleNavCollapse}
            >
              Admin Panel Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/displaycomplain"
              onClick={handleNavCollapse}
            >
              Display Requests
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/UniformComplainsDisplay"
              onClick={handleNavCollapse}
            >
              Display Uniform Complain
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/update_self"
              onClick={handleNavCollapse}
            >
              Update Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/updateunp"
              onClick={handleNavCollapse}
            >
              Update Username And Password
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/FlexibleComp"
              onClick={handleNavCollapse}
            >
              Flexible Component
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Ropa2019"
              onClick={handleNavCollapse}
            >
              ROPA 2019
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Retirement Date Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/amtawestwbtpta"
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </NavLink>
          </li>
          {questionRateState.isAccepting && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/QuestionRequisition"
                onClick={handleNavCollapse}
              >
                Question Requisition
              </NavLink>
            </li>
          )}
          <div className="row">
            <li className="nav-item">
              <img
                src={decryptObjData("uid")?.url}
                alt="profile"
                className="navprofileImage"
                onClick={() => {
                  navigate("ChangePhoto");
                  handleNavCollapse();
                }}
              />
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/logout"
                onClick={handleNavCollapse}
              >
                Logout
              </NavLink>
            </li>
          </div>
          <NavLink
            className="nav-link"
            onClick={() => {
              handleNavCollapse();
              storeSchoolData();
              storeTeachersData();
              getAcceptingData();
              setTeacherUpdateTime(Date.now() - 1000 * 60 * 15);
              setSchoolUpdateTime(Date.now() - 1000 * 60 * 15);
              setSlideUpdateTime(Date.now() - 1000 * 60 * 15);
              setNoticeUpdateTime(Date.now() - 1000 * 60 * 15);
              setMemoUpdateTime(Date.now() - 1000 * 60 * 15);
              setQuestionUpdateTime(Date.now() - 1000 * 60 * 15);
              setQuestionRateUpdateTime(Date.now() - 1000 * 60 * 15);
            }}
          >
            <i className="bi bi-arrow-clockwise text-success fs-3 cursor-pointer"></i>
          </NavLink>
        </>
      );
    } else if (state === "taw") {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/home"
              onClick={handleNavCollapse}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/dashboard"
              onClick={handleNavCollapse}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/findteacher"
              onClick={handleNavCollapse}
            >
              Search Teacher
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/StudentTeacherRatio"
              onClick={handleNavCollapse}
            >
              Student Teacher Ratio
            </NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/techsalary"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === decryptObjData("tid")?.udise
                  )
                );
              }}
            >
              All Teacher's Salary Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/TechAccuitance"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === decryptObjData("tid")?.udise
                  )
                );
              }}
            >
              Acquittance Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/payslipwbtpta"
              onClick={() => {
                handleNavCollapse();
                setStateObject(decryptObjData("tid"));
              }}
            >
              Generate Payslip
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Form16Prev"
              onClick={() => {
                handleNavCollapse();
                setStateObject(decryptObjData("tid"));
              }}
            >
              Generate Form 16
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/schoolteacherdata"
              onClick={handleNavCollapse}
            >
              School Teacher Data
            </NavLink>
          </li>

          {question === "admin" ? (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/gpwiseschool"
                  onClick={handleNavCollapse}
                >
                  GP Wise School Data
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/GPWiseTeacher"
                  onClick={handleNavCollapse}
                >
                  GP Wise Teacher Data
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/questionsec"
                  onClick={handleNavCollapse}
                >
                  Question Section
                </NavLink>
              </li>
            </>
          ) : null}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/result"
              onClick={handleNavCollapse}
            >
              Result Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/update_self"
              onClick={handleNavCollapse}
            >
              Update Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/updateunp"
              onClick={handleNavCollapse}
            >
              Update Username And Password
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/FloodRelief"
              onClick={handleNavCollapse}
            >
              Flood Relief
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Ropa2019"
              onClick={handleNavCollapse}
            >
              ROPA 2019
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Retirement Date Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/amtawestwbtpta"
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </NavLink>
          </li>
          {questionRateState.isAccepting && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/QuestionRequisition"
                onClick={handleNavCollapse}
              >
                Question Requisition
              </NavLink>
            </li>
          )}
          <div className="row">
            <li className="nav-item">
              <img
                src={decryptObjData("uid")?.url}
                alt="profile"
                className="navprofileImage"
                onClick={() => navigate("ChangePhoto")}
              />
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/logout"
                onClick={handleNavCollapse}
              >
                Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                onClick={() => {
                  handleNavCollapse();
                  storeSchoolData();
                  storeTeachersData();
                  getAcceptingData();
                  setTeacherUpdateTime(Date.now() - 1000 * 60 * 15);
                  setSchoolUpdateTime(Date.now() - 1000 * 60 * 15);
                  setSlideUpdateTime(Date.now() - 1000 * 60 * 15);
                  setNoticeUpdateTime(Date.now() - 1000 * 60 * 15);
                  setMemoUpdateTime(Date.now() - 1000 * 60 * 15);
                  setQuestionUpdateTime(Date.now() - 1000 * 60 * 15);
                  setQuestionRateUpdateTime(Date.now() - 1000 * 60 * 15);
                }}
              >
                <i className="bi bi-arrow-clockwise text-success fs-3 cursor-pointer"></i>
              </NavLink>
            </li>
          </div>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/home"
              onClick={handleNavCollapse}
            >
              Home
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/FlexibleComp"
              onClick={handleNavCollapse}
            >
              Flexible Component
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/SchoolTeacherDataUnlog"
              onClick={handleNavCollapse}
            >
              Student Teacher Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/TeacherDatabaseUnlog"
              onClick={handleNavCollapse}
            >
              Teacher Database
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/FloodRelief"
              onClick={handleNavCollapse}
            >
              Flood Relief
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/Ropa2019"
              onClick={handleNavCollapse}
            >
              ROPA 2019
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Retirement Date Calculator
            </NavLink>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/amtawestwbtpta"
              onClick={handleNavCollapse}
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </NavLink>
          </li>
          {/* {questionRateState.isAccepting && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/QuestionRequisition"
                onClick={handleNavCollapse}
              >
                Question Requisition
              </NavLink>
            </li>
          )} */}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/login"
              onClick={handleNavCollapse}
            >
              Login
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar align-items-end navbar-expand-lg bg-white px-lg-3 py-lg-2 shadow-sm sticky-top p-2 overflow-auto bg-body-tertiary noprint">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/logo.png"
            alt="LOGO"
            width={"70vw"}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>
      </div>
      {showLoader && <Loader />}
    </nav>
  );
};

export default Navbar;
