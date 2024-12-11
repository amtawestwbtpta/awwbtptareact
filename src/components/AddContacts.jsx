import React, { useState } from "react";
import { firestore, useFirebase } from "../context/FirbaseContext";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../context/FirbaseContext";
import { Loader } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const AddContacts = () => {
  const docId = uuid();
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const folder = "contacts";
  const [data, setData] = useState(false);
  const [datas, setDatas] = useState([]);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadablePhoto, setUploadablePhoto] = useState(null);
  const [photoCropped, setPhotoCropped] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const [inputField, setInputField] = useState({
    id: docId,
    name: "",
    designation: "",
    mobile: "",
  });
  const [errInputField, setInputErrField] = useState({
    errName: "",
    errDesignation: "",
    errMobile: "",
  });
  const submitDetails = () => {
    if (validForm()) {
      if (file == null) {
        toast.error("Upload File First!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else {
        setLoader(true);
        const filestorageRef = ref(storage, `/${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(
          filestorageRef,
          uploadablePhoto
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // // update progress
            setProgress(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then(async (photourl) => {
              // console.log(url);

              try {
                await setDoc(doc(firestore, "contacts", docId), {
                  id: docId,
                  name: inputField.name,
                  designation: inputField.designation,
                  mobile: inputField.mobile,
                  url: photourl,
                });
                toast.success("Congrats! Data Uploaded Successfully!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });

                setLoader(false);

                document.getElementById("file-upload").value = "";
              } catch (e) {
                toast.success("File Upload Failed!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setLoader(false);
              }
            });
          }
        );
      }
    }
  };
  const validForm = () => {
    let isValid = true;
    if (inputField.name == "") {
      setInputErrField((prev) => ({
        prev,
        errTitle: "Please Enter Valid Name",
      }));
      isValid = false;
    }
    if (inputField.designation == "") {
      setInputErrField((prev) => ({
        prev,
        errDesignation: "Please Enter Valid Designation",
      }));
      isValid = false;
    }
    if (inputField.mobile == "") {
      setInputErrField((prev) => ({
        prev,
        errMobile: "Please Enter Valid Mobile No.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const showData = async () => {
    setData(true);
    const q = query(collection(firestore, folder));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDatas(data);
  };
  const handleChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setPhotoCropped(true);
  };
  function getCroppedImg() {
    setPhotoCropped(false);
    setDisabled(false);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    // console.log(base64Image);
    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          try {
            blob.name = file.name;
            resolve(blob);
            setUploadablePhoto(blob);
          } catch (e) {
            setResult(null);
            toast.error("Select Crop Area First, Plese Reselect Photo", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        file.type,
        1
      );
    });
  }
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
      <h3 className="text-primary text-center">Add AWWBTPTA Leading Persons</h3>
      <div className="col-md-6 mx-auto my-3">
        <form autoComplete="off">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={inputField.name}
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  name: e.target.value.toUpperCase(),
                })
              }
            />
            {errInputField.errName.length > 0 && (
              <span className="error">{errInputField.errName}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Designation"
              value={inputField.designation}
              onChange={(e) =>
                setInputField({ ...inputField, designation: e.target.value })
              }
            />
            {errInputField.errDesignation.length > 0 && (
              <span className="error">{errInputField.errDesignation}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile"
              value={inputField.mobile}
              onChange={(e) =>
                setInputField({ ...inputField, mobile: e.target.value })
              }
            />
            {errInputField.errMobile.length > 0 && (
              <span className="error">{errInputField.errMobile}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type="file"
              id="file-upload"
              className="form-control"
              placeholder="Upload Document"
              onChange={handleChange}
            />
          </div>
          <div
            className="progress-bar"
            style={{
              width: progress + "%",
              height: "15px",
              backgroundColor: "purple",
              borderRadius: "10px",
              transformOrigin: "start",
            }}
          ></div>
          <div className="col-md-6 mt-3">
            {src && photoCropped && (
              <div
                className="col-md-6 mx-auto"
                style={{ width: "70%", height: "70%" }}
              >
                <ReactCrop
                  src={src}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                />
                <div>
                  <button
                    type="button"
                    className="btn btn-success my-2"
                    onClick={getCroppedImg}
                  >
                    Crop
                  </button>
                </div>
              </div>
            )}
            {result && (
              <div className="col-md-6">
                <img src={result} alt="profilePhoto" className="img-fluid" />
              </div>
            )}
          </div>
          {loader ? <Loader center content="loading" size="lg" /> : null}
          <div className="my-3">
            <button
              type="button"
              className="btn btn-success my-3"
              onClick={submitDetails}
              disabled={disabled}
            >
              Upload Details
            </button>
          </div>
        </form>
        <div className="my-3">
          <button
            type="button"
            className="btn btn-success my-3"
            onClick={showData}
          >
            Show Contacts
          </button>
        </div>
        {data && (
          <div className="div">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((el, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.designation}</td>
                      <td>
                        <img
                          src={el.url}
                          style={{ width: "100px", height: "100px" }}
                          alt="Photo"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddContacts;
