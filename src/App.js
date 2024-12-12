import "./App.css";
import "react-toastify/dist/ReactToastify.css";
//eslint-disable-next-line
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TaxCalculator from "./components/TaxCalculator";
import PayslipWbtpta from "./components/PayslipWbtpta";
import Downloads from "./components/Downloads";
import SchoolTeacherData from "./components/SchoolTeacherData";
import TechSalary from "./components/TechSalary";
import AgeCalculator from "./components/AgeCalculator";
import GpWiseSchool from "./components/GpWiseSchool";
import QuestionSec from "./components/QuestionSec";
import TeacherDatabase from "./components/TeacherDatabase";
import TeacherAddress from "./components/TeacherAddress";
import DisplayDatabase from "./components/DisplayDatabase";
import DisplayComplain from "./components/DisplayComplain";
import AdminDashboard from "./components/AdminDashboard";
import UpdateSelf from "./components/UpdateSelf";
import UpdateUP from "./components/UpdateUP";
import Complain from "./components/Complain";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import Header from "./components/Header";
import Registration from "./components/Registration";
import OtpForm from "./components/OtpForm";

import PrintQuestionInvoice from "./components/PrintQuestionInvoice";
import PrintQuestionAll from "./components/PrintQuestionAll";
import PrintQuestionAllCompact from "./components/PrintQuestionAllCompact";

import AdminUploadFile from "./components/AdminUploadFile";
import AdminUploadImage from "./components/AdminUploadImage";
import PaySlipOSMS from "./components/PaySlipOSMS";
import PaySlipOSMSNew from "./components/PaySlipOsmsNew";
import Footer from "./components/Footer";
import FindTeacher from "./components/FindTeacher";
import ViewDetails from "./components/ViewDetails";
import JulySalary from "./components/JulySalary";
import AddTeacher from "./components/AddTeacher";
import StudentTeacherRatio from "./components/StudentTeacherRatio";
import Form16 from "./components/Form16";
import Form16Prev from "./components/Form16Prev";
import SchoolTeacherDataUnlog from "./components/SchoolTeacherDataUnlog";
import TeacherDatabaseUnlog from "./components/TeacherDatabaseUnlog";
import ChangePhoto from "./components/ChangePhoto";
import AdminAccounts from "./components/AdminAccounts";
import RetirementCalculator from "./components/RetirementCalculator";
import Result from "./components/Result";
import ClassPPResult from "./components/ClassPPResult";
import Class12Result from "./components/Class12Result";
import Class345Result from "./components/Class345Result";
import AllPPResult from "./components/AllPPResult";
import AllClass12Result from "./components/AllClass12Result";
import AllClass345Result from "./components/AllClass345Result";
import ClassPPERegister from "./components/ClassPPERegister";
import Class12ERegister from "./components/Class12ERegister";
import Class345ERegister from "./components/Class345ERegister";
import DressComplains from "./components/DressComplains";
import UniformComplainsDisplay from "./components/UniformComplainsDisplay";
import TeacherPhotoCorner from "./components/TeacherPhotoCorner";
import Notification from "./components/Notification";
import NotificationDetails from "./components/NotificationDetails";
import MemoSection from "./components/MemoSection";
import NoticeDetails from "./components/NoticeDetails";
import StudentsPhotoCorner from "./components/StudentsPhotoCorner";
import QuestionPublic from "./components/QuestionPublic";
import GPWiseTeacher from "./components/GPWiseTeacher";
import FlexibleComp from "./components/FlexibleComp";

import React, { useEffect, useState } from "react";
import TechAccuitance from "./components/TechAccuitance";
import TeacherServiceLife from "./components/TeacherServiceLife";
import YearWiseTeachers from "./components/YearWiseTeachers";
import Ropa2019 from "./components/Ropa2019";
import EditTeacher from "./components/EditTeacher";
import QuestionRequisition from "./components/QuestionRequisition";
import FloodRelief from "./components/FloodRelief";
import DownloadOsmsPayslip from "./components/DownloadOsmsPayslip";
import { ToastContainer } from "react-toastify";
import DownloadWBTPTAPayslip from "./components/DownloadWBTPTAPayslip";
import Retirement from "./components/Retirement";
import IncomeTax from "./components/IncomeTax";
import ITSection from "./components/ITSection";
import IncomeTaxNewReigme from "./components/IncomeTaxNewReigme";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/JulySalary" element={<JulySalary />} />
      <Route exact path="/taxcalculator" element={<TaxCalculator />} />
      <Route exact path="/payslipwbtpta" element={<PayslipWbtpta />} />
      <Route exact path="/techpaysliposms" element={<PaySlipOSMS />} />
      <Route exact path="/techpaysliposmsNew" element={<PaySlipOSMSNew />} />
      <Route exact path="/Form16" element={<Form16 />} />
      <Route exact path="/Form16Prev" element={<Form16Prev />} />
      <Route exact path="/downloads" element={<Downloads />} />
      <Route exact path="/schoolteacherdata" element={<SchoolTeacherData />} />
      <Route
        exact
        path="/SchoolTeacherDataUnlog"
        element={<SchoolTeacherDataUnlog />}
      />
      <Route
        exact
        path="/StudentTeacherRatio"
        element={<StudentTeacherRatio />}
      />
      <Route exact path="/techsalary" element={<TechSalary />} />
      <Route exact path="/agecalculator" element={<AgeCalculator />} />
      <Route exact path="/gpwiseschool" element={<GpWiseSchool />} />
      <Route exact path="/GPWiseTeacher" element={<GPWiseTeacher />} />
      <Route exact path="/FlexibleComp" element={<FlexibleComp />} />
      <Route
        exact
        path="/TeacherServiceLife"
        element={<TeacherServiceLife />}
      />
      <Route exact path="/YearWiseTeachers" element={<YearWiseTeachers />} />
      <Route exact path="/Ropa2019" element={<Ropa2019 />} />
      <Route exact path="/EditTeacher" element={<EditTeacher />} />

      <Route exact path="/result" element={<Result />} />
      <Route exact path="/ClassPPResult" element={<ClassPPResult />} />
      <Route exact path="/Class12Result" element={<Class12Result />} />
      <Route exact path="/Class345Result" element={<Class345Result />} />
      <Route exact path="/AllPPResult" element={<AllPPResult />} />
      <Route exact path="/AllClass12Result" element={<AllClass12Result />} />
      <Route exact path="/AllClass345Result" element={<AllClass345Result />} />
      <Route exact path="/ClassPPERegister" element={<ClassPPERegister />} />
      <Route exact path="/Class12ERegister" element={<Class12ERegister />} />
      <Route exact path="/Class345ERegister" element={<Class345ERegister />} />
      <Route
        exact
        path="/TeacherPhotoCorner"
        element={<TeacherPhotoCorner />}
      />
      <Route
        exact
        path="/StudentsPhotoCorner"
        element={<StudentsPhotoCorner />}
      />
      <Route exact path="/questionsec" element={<QuestionSec />} />
      <Route exact path="/QuestionPublic" element={<QuestionPublic />} />
      <Route
        exact
        path="/QuestionRequisition"
        element={<QuestionRequisition />}
      />
      <Route
        exact
        path="/printquestioninvoice"
        element={<PrintQuestionInvoice />}
      />
      <Route exact path="/PrintQuestionAll" element={<PrintQuestionAll />} />

      <Route
        exact
        path="/PrintQuestionAllCompact"
        element={<PrintQuestionAllCompact />}
      />

      <Route exact path="/teacherdatabase" element={<TeacherDatabase />} />
      <Route
        exact
        path="/TeacherDatabaseUnlog"
        element={<TeacherDatabaseUnlog />}
      />
      <Route exact path="/ChangePhoto" element={<ChangePhoto />} />
      <Route exact path="/findteacher" element={<FindTeacher />} />
      <Route exact path="/teacherAddress" element={<TeacherAddress />} />
      <Route exact path="/displaydatabase" element={<DisplayDatabase />} />
      <Route exact path="/displaycomplain" element={<DisplayComplain />} />
      <Route exact path="/ViewDetails" element={<ViewDetails />} />
      <Route exact path="/AddTeacher" element={<AddTeacher />} />

      <Route exact path="/admindashboard" element={<AdminDashboard />} />
      <Route exact path="/adminUploadFile" element={<AdminUploadFile />} />
      <Route exact path="/adminUploadImage" element={<AdminUploadImage />} />
      <Route exact path="/AdminAccounts" element={<AdminAccounts />} />
      <Route exact path="/MemoSection" element={<MemoSection />} />
      <Route exact path="/Notification" element={<Notification />} />
      <Route
        exact
        path="/NotificationDetails"
        element={<NotificationDetails />}
      />
      <Route exact path="/NoticeDetails" element={<NoticeDetails />} />
      <Route exact path="/FloodRelief" element={<FloodRelief />} />
      <Route
        exact
        path="/DownloadOsmsPayslip"
        element={<DownloadOsmsPayslip />}
      />
      <Route
        exact
        path="/DownloadWBTPTAPayslip"
        element={<DownloadWBTPTAPayslip />}
      />
      <Route
        exact
        path="/IncomeTax"
        element={<IncomeTax />}
      />
      <Route
        exact
        path="/IncomeTaxNew"
        element={<IncomeTaxNewReigme />}
      />
      <Route
        exact
        path="/ITSection"
        element={<ITSection />}
      />

      <Route exact path="/update_self" element={<UpdateSelf />} />
      <Route exact path="/updateunp" element={<UpdateUP />} />
      <Route exact path="/complain" element={<Complain />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/logout" element={<LogOut />} />
      <Route exact path="/forgotPassword" element={<OtpForm />} />
      <Route exact path="/DressComplains" element={<DressComplains />} />
      <Route
        exact
        path="/UniformComplainsDisplay"
        element={<UniformComplainsDisplay />}
      />

      <Route
        exact
        path="/RetirementCalculator"
        element={<RetirementCalculator />}
      />
      <Route exact path="/TechAccuitance" element={<TechAccuitance />} />
      <Route exact path="/Retirement" element={<Retirement />} />
    </Routes>
  );
};
function App() {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowAlert(true);
    }, 500);
    setTimeout(() => {
      setShowAlert(false);
    }, 15000);
  }, []);
  return (
    <HashRouter>
      <div className="App">
        {showAlert && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>To download Our Android App Click</strong>{" "}
            <a
              className="d-inline-block text-decoration-none fw-bold"
              href="https://drive.google.com/drive/folders/1QQzBMJjI_MXTKxP3_ayTo7QflGD0vbVP?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here
            </a>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        />
        <Header />
        <Navbar />
        <Routing />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
