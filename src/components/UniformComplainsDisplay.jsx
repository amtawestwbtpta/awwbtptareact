import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { useNavigate } from "react-router";

import DataTable from "react-data-table-component";
import { firestore } from "../context/FirbaseContext";
import { query, collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";
const UniformComplainsDisplay = () => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (state !== "admin") {
      localStorage.clear();
      navigate("/logout");
    }
    // eslint-disable-next-line
  }, []);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState({
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
    date: Date.now(),
  });
  const [showTable, setShowTable] = useState(false);

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.complainerName,
      sortable: true,
    },
    {
      name: "School",
      selector: (row) => row.school,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row.complainerMobile,
    },

    {
      name: "View Complain",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={(e) => setSelectedSchool(row)}
        >
          Show Complain
        </button>
      ),

      sortable: true,
    },

    {
      name: "Registered On",
      selector: (row) => {
        let date = new Date(row.date);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      },
      sortable: true,
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => {
            let conf = confirm("Are You Sure to Delete This Complain?"); //eslint-disable-line
            if (conf) {
              deleteComplain(row.id);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  const userData = async () => {
    const q = query(collection(firestore, "uniformComplains"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setData(data);
    setShowTable(true);
    console.log(data);
  };

  const deleteComplain = async (id) => {
    // console.log(id);
    await deleteDoc(doc(firestore, "uniformComplains", id));
    toast.success("Complain Deleted Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    userData();

    // console.log(user.teachersID);
    // console.log(res);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST: Display Uniform Complains";
    userData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const result = data.filter((el) => {
      return el.school.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
    // eslint-disable-next-line
  }, [search, data]);

  return (
    <div className="container timesFont my-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {showTable ? (
        <>
          <h3 className="text-center text-primary mb-3">
            Displaying Complains
          </h3>

          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search"
                className="w-25 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            subHeaderAlign="right"
          />
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    {selectedSchool.school}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <h5 className="text-center">
                      Complainer's Name: {selectedSchool.complainerName}
                    </h5>

                    <h5 className="text-center">
                      School name: {selectedSchool.school}
                    </h5>

                    <h5 className="text-center">
                      Complainer's Mobile No.: {selectedSchool.complainerMobile}
                    </h5>
                    <h5 className="text-center">
                      Total Number of PP Students: {selectedSchool.pp}
                    </h5>
                    {selectedSchool.ppProblem && (
                      <h5 className="text-center">
                        Total Number Problems Found in PP Students:{" "}
                        {selectedSchool.ppProblem}
                      </h5>
                    )}
                    {selectedSchool.ppProblemDetails && (
                      <h5 className="text-center">
                        Brief Details of PP Students Problem:{" "}
                        {selectedSchool.ppProblemDetails}
                      </h5>
                    )}
                    {selectedSchool.i && (
                      <h5 className="text-center">
                        Total Number of Class I Students: {selectedSchool.i}
                      </h5>
                    )}
                    {selectedSchool.iProblem && (
                      <h5 className="text-center">
                        Total Number Problems Found in Class I Students:{" "}
                        {selectedSchool.iProblem}
                      </h5>
                    )}
                    {selectedSchool.iProblemDetails && (
                      <h5 className="text-center">
                        Brief Details of Class I Students Problem:{" "}
                        {selectedSchool.iProblemDetails}
                      </h5>
                    )}
                    {selectedSchool.ii && (
                      <h5 className="text-center">
                        Total Number of Class II Students: {selectedSchool.ii}
                      </h5>
                    )}
                    {selectedSchool.iiProblem && (
                      <h5 className="text-center">
                        Total Number Problems Found in Class II Students:{" "}
                        {selectedSchool.iiProblem}
                      </h5>
                    )}
                    {selectedSchool.iiProblemDetails && (
                      <h5 className="text-center">
                        Brief Details of Class II Students Problem:{" "}
                        {selectedSchool.iiProblemDetails}
                      </h5>
                    )}
                    {selectedSchool.iii && (
                      <h5 className="text-center">
                        Total Number of Class III Students: {selectedSchool.iii}
                      </h5>
                    )}
                    {selectedSchool.iiiProblem && (
                      <h5 className="text-center">
                        Total Number Problems Found in Class III Students:{" "}
                        {selectedSchool.iiiProblem}
                      </h5>
                    )}
                    {selectedSchool.iiiProblemDetails && (
                      <h5 className="text-center">
                        Brief Details of Class III Students Problem:{" "}
                        {selectedSchool.iiiProblemDetails}
                      </h5>
                    )}
                    {selectedSchool.iv && (
                      <h5 className="text-center">
                        Total Number of Class IV Students: {selectedSchool.iv}
                      </h5>
                    )}
                    {selectedSchool.ivProblem && (
                      <h5 className="text-center">
                        Total Number Problems Found in Class IV Students:{" "}
                        {selectedSchool.ivProblem}
                      </h5>
                    )}
                    {selectedSchool.ivProblemDetails && (
                      <h5 className="text-center">
                        Brief Details of Class IV Students Problem:{" "}
                        {selectedSchool.ivProblemDetails}
                      </h5>
                    )}

                    {selectedSchool.v ? (
                      <>
                        <h5 className="text-center">
                          Total Number of Class V Students: {selectedSchool.v}
                        </h5>
                        <h5 className="text-center">
                          Total Number Problems Found in Class V Students:{" "}
                          {selectedSchool.vProblem}
                        </h5>
                        <h5 className="text-center">
                          Brief Details of Class V Students Problem:{" "}
                          {selectedSchool.vProblemDetails}
                        </h5>
                      </>
                    ) : null}
                    <h5 className="text-center">
                      Total Number of Students: {selectedSchool.totalStudent}
                    </h5>
                    <h5 className="text-center">
                      Total Number Problems Found: {selectedSchool.problemFound}
                    </h5>

                    {selectedSchool.remarks ? (
                      <>
                        <h5 className="text-center">
                          Total Number Problems Found: {selectedSchool.remarks}
                        </h5>
                      </>
                    ) : null}
                  </div>
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UniformComplainsDisplay;
