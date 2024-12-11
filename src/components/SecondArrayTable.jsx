import React from "react";

const SecondArrayTable = ({ firstArray, secondArray }) => {
  // Function to retrieve values from each object in the second array using keys from the first array
  const getValues = () => {
    return secondArray.map((obj, index) => {
      return (
        <tr key={index}>
          {firstArray.map((key, i) => (
            <td key={i}>{obj.hasOwnProperty(key) ? obj[key] : null}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {firstArray.map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>{getValues()}</tbody>
    </table>
  );
};

export default SecondArrayTable;
