import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/Store";
import { getCurrentDateInput } from "../modules/calculatefunctions";
const GetSort = () => {
  const { teachersState } = useGlobalContext();
  const [list, setList] = useState(teachersState);

  const sortList = () => {
    let newDatas = teachersState.sort(
      (a, b) =>
        a.school.localeCompare(b.school) ||
        b.hoi.localeCompare(a.hoi) ||
        getDateValue(a.dojnow) > getDateValue(b.dojnow)
    );
    setList(newDatas);
    console.log("sorted");
  };
  const sortBy = function (arr, ...sortByArgs) {
    arr.sort(function (a, b) {
      let sortResult = 0;
      sortByArgs.forEach(function (arg) {
        if (sortResult != 0) return;
        if (Object.values(arg)[0] == "desc") {
          let propName = Object.keys(arg)[0];
          if (a[propName] > b[propName]) {
            sortResult = -1;
            return;
          }
          if (a[propName] < b[propName]) {
            sortResult = 1;
            return;
          }
        } else {
          if (a[arg] < b[arg]) {
            sortResult = -1;
            return;
          }
          if (a[arg] > b[arg]) {
            sortResult = 1;
            return;
          }
        }
      });

      return sortResult;
    });
  };
  const getDateValue = (date) => {
    let data = date.split("-");
    let day = data[2];
    let month = data[1];
    let year = data[0];
    let newDate = `${month}-${day}-${year}`;
    return Date.parse(newDate);
  };

  useEffect(() => {
    //eslint-disable-next-line
  }, [list]);
  return (
    <div className="container my-3">
      <button type="button" className="btn btn-primary" onClick={sortList}>
        Sort
      </button>
      <div className="row mx-auto">
        {list.map((teacher) => (
          <div className="card m-2 p-2 w-25 col-md-4" key={teacher.id}>
            <div className="card-body">
              <h5 className="card-title">{teacher.tname}</h5>
              <p className="card-text">{teacher.school}</p>
              <p className="card-text">{teacher.desig}</p>
              <p className="card-text">{teacher.doj}</p>
              <p className="card-text">
                {Date.parse(getCurrentDateInput(teacher.dojnow))}
              </p>
              <p className="card-text">{teacher.dojnow}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetSort;
