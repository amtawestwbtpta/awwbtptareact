import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../context/FirbaseContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { decryptObjData, getCookie } from "../modules/encryption";
import { DateValueToSring } from "../modules/calculatefunctions";
import { v4 as uuid } from "uuid";
import { notifyAll } from "../modules/notification";
const height = window.screen.height;
const width = window.screen.width;
const NotificationDetails = () => {
  let teacherdetails = {
    convenor: "",
    gp: "",
    school: "",
    circle: "",
    tname: "",
    udise: "",
  };

  let details = getCookie("tid");
  let userdetails = {
    username: "",
  };
  if (details) {
    teacherdetails = decryptObjData("tid");
    userdetails = decryptObjData("uid");
  }
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const noticeId = teacherdetails.id + "-" + uuid().split("-")[0];
  const title = searchParams.get("title");
  const date = parseInt(searchParams.get("date"));
  const noticeText = searchParams.get("noticeText");
  const addedBy = searchParams.get("addedBy");
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const [orgReply, setOrgReply] = useState("");
  const [editReplyObj, setEditReplyObj] = useState({
    id: "",
    token: "",
    username: "",
    tname: "",
    school: "",
    gp: "",
    association: "",
    email: "",
    phone: "",
    reply: "",
    date: "",
    noticeId: "",
  });
  const [noticeReplies, setNoticeReplies] = useState([]);
  const url =
    searchParams.get("url") !== ""
      ? searchParams.get("url").split("noticeImages/")[0] +
        "noticeImages%2F" +
        searchParams.get("url").split("noticeImages/")[1] +
        "&token=" +
        searchParams.get("token")
      : "";

  const getNoticeReplies = async () => {
    setLoader(true);
    const q = query(
      collection(firestore, "noticeReply"),
      where("noticeId", "==", id)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setNoticeReplies(data);
    setLoader(false);
  };

  const addComment = async () => {
    setLoader(true);
    await setDoc(doc(firestore, "noticeReply", noticeId), {
      id: noticeId,
      token: "",
      username: userdetails.username,
      tname: teacherdetails.tname,
      school: teacherdetails.school,
      gp: teacherdetails.gp,
      association: teacherdetails.association,
      email: teacherdetails.email,
      phone: teacherdetails.phone,
      reply: comment,
      date: Date.now(),
      noticeId: id,
    })
      .then(async () => {
        let noticeTitle = `New Comment By ${teacherdetails.tname}`;
        let body = comment;
        await notifyAll(noticeTitle, body)
          .then(async () => {
            setComment("");
            setLoader(false);
            toast.success("Comment Added Successfully!");
            getNoticeReplies();
          })
          .catch((e) => {
            console.log(e);
            setLoader(false);
            toast.error("Error Sending Notification");
          });
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Comment Addition Failed!");
        console.log(e);
      });
  };

  const updateReply = async () => {
    setLoader(true);
    const docRef = doc(firestore, "noticeReply", editReplyObj.id);
    await updateDoc(docRef, {
      reply: editReplyObj.reply,
      editDate: Date.now(),
      editedBy: teacherdetails.tname,
    })
      .then(async () => {
        let noticeTitle = `Comment Edited By ${teacherdetails.tname}`;
        let body = `Comment: ${editReplyObj.reply}`;
        await notifyAll(noticeTitle, body).then(() => {
          setLoader(false);
          toast.success("Comment Updated Successfully");
          getNoticeReplies();
        });
      })
      .catch((err) => {
        toast.error("Comment Updation Failed!");
        console.log(err);
      });
  };

  const delReply = async (id) => {
    setLoader(true);
    await deleteDoc(doc(firestore, "noticeReply", id))
      .then(() => {
        setLoader(false);
        toast.success("Notice Deleted Successfully!");
        getNoticeReplies();
      })
      .catch((err) => {
        setLoader(false);
        toast.error("Notice Deletation Failed!");
        console.log(err);
      });
  };

  useEffect(() => {
    getNoticeReplies();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-3">
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

      {url !== "" ? (
        type.split("/")[0] === "image" ? (
          <img
            src={
              url !== ""
                ? url
                : "https://raw.githubusercontent.com/awwbtpta/data/main/notice.png"
            }
            className="rounded-2 w-100 my-3"
            style={{ cursor: "pointer" }}
            alt="..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        ) : type.split("/")[0] === "application" ? (
          width > 500 ? (
            <div>
              <object
                data={url}
                type={type}
                // width={width}
                height={height}
                className="w-100"
                aria-labelledby="Pdf"
              ></object>
              <a
                href={url}
                className="btn btn-success my-3 rounded text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          ) : (
            <a
              href={url}
              className="btn btn-success my-3 rounded text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          )
        ) : null
      ) : null}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={
                  url !== ""
                    ? url
                    : "https://raw.githubusercontent.com/awwbtpta/data/main/notice.png"
                }
                className="rounded-2 w-100 my-3"
                alt="..."
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3
        className={`text-success fs-3 ${
          !/^[a-zA-Z]+$/.test(title.split(" ")[0]) ? "ben" : "timesFont"
        }`}
      >
        {title}
      </h3>
      <h5 className="text-info timesFont">
        Published At: {DateValueToSring(date)}
      </h5>
      <h5 className="text-dark timesFont">By: {addedBy}</h5>
      <h5
        className={`text-primary fs-5 ${
          !/^[a-zA-Z]+$/.test(noticeText.split(" ")[0]) ? "ben" : "timesFont"
        }`}
      >
        {noticeText}
      </h5>
      {noticeReplies.length > 0 && (
        <div className="my-5">
          <h3 className={`fs-3 timesFont`} style={{ color: "blueviolet" }}>
            Comments:
          </h3>

          {noticeReplies.map((el, index) => (
            <div className="m-2" key={index}>
              <h4
                className={`text-primary fs-5 ${
                  !/^[a-zA-Z]+$/.test(el.reply.split(" ")[0])
                    ? "ben"
                    : "timesFont"
                }`}
              >
                {`${index + 1}) `}
                {el.reply}
              </h4>
              <p className={`text-success timesFont`}>By {el.tname}</p>
              <p className={`text-black timesFont`}>
                On {DateValueToSring(el.date)}
              </p>
              {el.editedBy !== undefined ? (
                <p className={`text-dark timesFont`}>
                  Edited By: {el.editedBy} On {DateValueToSring(el.editDate)}
                </p>
              ) : null}
              {(teacherdetails.circle === "admin" ||
                userdetails.username === el.username) && (
                <div className="my-2">
                  <button
                    type="button"
                    className="btn btn-sm m-1 btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editNotice"
                    onClick={() => {
                      setEditReplyObj(el);
                      setOrgReply(el.reply);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm m-1 btn-danger"
                    onClick={() => {
                      // eslint-disable-next-line
                      let conf = confirm(
                        "Are you sure you want to Delete this Comment?"
                      );
                      if (conf) {
                        delReply(el.id);
                      } else {
                        toast.success("Comment Not Deleted!!!");
                      }
                    }}
                  >
                    Delete
                  </button>
                  <div
                    className="modal fade"
                    id="editNotice"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="editNotice"
                    aria-hidden="true"
                  >
                    <div
                      className={`modal-dialog modal-xl timesFont
          }`}
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="editNoticeLabel">
                            Edit Comment
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <textarea
                            className="form-control mb-3 w-50 mx-auto"
                            rows={5}
                            placeholder="Enter Comment"
                            value={editReplyObj.reply}
                            onChange={(e) =>
                              setEditReplyObj({
                                ...editReplyObj,
                                reply: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              if (editReplyObj.reply !== "") {
                                if (editReplyObj.reply !== orgReply) {
                                  updateReply();
                                } else {
                                  toast.error("Nothing to Update!!!");
                                }
                              } else {
                                toast.error("Please fill the field");
                              }
                            }}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {teacherdetails.tname === "" && (
        <h5 className={`text-danger fs-5 timesFont`}>
          Please Login to Post Comments
        </h5>
      )}
      {teacherdetails.tname !== "" && (
        <div className="my-3 mx-auto">
          <button
            type="button"
            className="btn btn-sm btn-info"
            data-bs-toggle="modal"
            data-bs-target="#addNotice"
          >
            Add Comment
          </button>
          <div
            className="modal fade"
            id="addNotice"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="addNotice"
            aria-hidden="true"
          >
            <div
              className={`modal-dialog modal-xl timesFont
          }`}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addNoticeLabel">
                    Add Comment
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control mb-3 w-50 mx-auto"
                    rows={5}
                    placeholder="Enter Your Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      if (comment !== "") {
                        addComment();
                      } else {
                        toast.error("Please Enter Your Comment");
                      }
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loader && <Loader />}
    </div>
  );
};

export default NotificationDetails;
