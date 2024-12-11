import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import { useNavigate } from "react-router";

import DataTable from "react-data-table-component";
import { Loader } from "rsuite";
// import { firestore } from "../context/FirbaseContext";
// import { collection, getDocs, query } from "firebase/firestore";
const TeacherAddress = () => {
  const { state, teachersState } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate("/logout");
    }
  });
  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userData = async () => {
    // const q = query(collection(firestore, "teachers"));

    // const querySnapshot = await getDocs(q);
    // const data = querySnapshot.docs.map((doc) => ({
    //   // doc.data() is never undefined for query doc snapshots
    //   ...doc.data(),
    //   id: doc.id,
    // }));
    // setData(data);
    setData(teachersState);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teacher's Address";
    userData();
  }, []);

  useEffect(() => {
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      sortable: true,
      width: "80px", // added line here
      center: true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      width: "300px", // added line here
      center: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      width: "400px", // added line here
      center: true,
    },
    {
      name: "UDISE NO.",
      selector: (row) => row.udise,
      sortable: true,
      width: "200px", // added line here
      center: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "1000px", // added line here
      center: true,
    },
  ];

  return (
    <div className="container-fluid text-center my-5">
      {showTable ? (
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
      ) : (
        <Loader center content="loading" size="lg" />
      )}
    </div>
  );
};

export default TeacherAddress;
