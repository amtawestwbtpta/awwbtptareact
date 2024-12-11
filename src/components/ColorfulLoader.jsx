import React, { useState, useEffect } from "react";
import "../css/Loader.css"; // You can create a Loader.css file for styling

const ColorfulLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some async task (e.g., API call, data loading)
    const fakeAsyncTask = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Replace 3000 with the desired loading time in milliseconds

    // Cleanup function to clear the timeout if the component unmounts before the loading finishes
    return () => {
      clearTimeout(fakeAsyncTask);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-circle orange"></div>
        <div className="loader-circle white">
          <div className="blue"></div>
        </div>
        <div className="loader-circle green"></div>
      </div>
    </div>
  );
};

export default ColorfulLoader;
