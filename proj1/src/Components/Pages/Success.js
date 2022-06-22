import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../Success.css";

function Success({ title, children }) {
  const secondToRedirect = 5

  const [secondsSuccess, setSecondsSuccess] = useState(secondToRedirect);
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (secondsSuccess > 0) {
        setSecondsSuccess(secondsSuccess - 1);
      }
      else{
        navigate("/")
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <div className="S-container">
        <div className="S-wrapper">
          <div className="S-icons">
            <BsCheckCircle />
          </div>
          <h3>{title ? title : "Sign up success"}</h3>
          <p>{children ? children : "Thank you for becoming our member"}</p>
          <p>Will return to home page in {secondsSuccess} seconds</p>
        </div>
      </div>
    </div>
  );
}

export default Success;
