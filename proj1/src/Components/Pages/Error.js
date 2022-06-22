import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import "../../Error.css";

function Error({ children }) {
  const secondToRedirect = 5

  const [secondsError, setSecondsError] = useState(secondToRedirect);
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (secondsError > 0) {
        setSecondsError(secondsError - 1);
      }
      else{
        navigate("/");
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <div className="E-container">
        <div className="E-wrapper">
          <div className="E-icons">
            <VscError />
          </div>
          <h3>Something when wrong</h3>
          {children ? children : <p>Please try again in a few minutes</p>}
          <p>Will return to home page in {secondsError} seconds</p>
          <p>Or click here to <span className = "E-direct"><Link to= "/">home page</Link></span></p>
        </div>
      </div>
    </div>
  );
}

export default Error;
