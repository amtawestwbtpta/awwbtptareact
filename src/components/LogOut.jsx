import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { useNavigate } from "react-router";
import { firbaseAuth } from "../context/FirbaseContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { deleteAllCookies } from "../modules/encryption";

const LogOut = () => {
  const navigate = useNavigate();
  const {
    setState,
    setTeacherUpdateTime,
    setSchoolUpdateTime,
    setSlideUpdateTime,
    setNoticeUpdateTime,
    setMemoUpdateTime,
    setQuestionUpdateTime,
  } = useGlobalContext();
  const refreashAllStates = () => {
    setState(null);
    setTeacherUpdateTime(Date.now() - 1000 * 60 * 15);
    setSchoolUpdateTime(Date.now() - 1000 * 60 * 15);
    setSlideUpdateTime(Date.now() - 1000 * 60 * 15);
    setNoticeUpdateTime(Date.now() - 1000 * 60 * 15);
    setMemoUpdateTime(Date.now() - 1000 * 60 * 15);
    setQuestionUpdateTime(Date.now() - 1000 * 60 * 15);
    navigate("/");
  };
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const signOutFirebase = () => {
    signOut(firbaseAuth);
    onAuthStateChanged(firbaseAuth, (user) => {
      if (user) {
        // Yes, You Are Looged In
        // console.log("Yes, You Are Looged In");
        setUser(user);
      } else {
        // User is Logged out
        // console.log("You are Logged Out");
        setUser(null);
      }
    });
  };
  useEffect(() => {
    signOutFirebase();
    refreashAllStates();
    deleteAllCookies();
    navigate("/login");

    // eslint-disable-next-line
  }, []);
  return <div className="container"></div>;
};

export default LogOut;
