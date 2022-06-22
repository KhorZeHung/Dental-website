import React from "react";
import Button from "./Button";
import "./HeroCard.css";
import { useNavigate } from "react-router-dom";

function HeroCard({ children, name, price, year, pic, btnName}) {
  const profilePic = require(`./Components/pic/${pic}`);
  const navigate = useNavigate()
  return (
    <>
      <div className="hc-container">
        <div className="hc-wrapper" style={{ justifyContent: "space-between" }}>
          <img
            src={profilePic}
            alt="Dentist profile pic"
            className="hc-round-pic"
          />
          <Button
            children={btnName}
            size="btn--small"
            round="1"
            type="button"
            btnOnClick={() => {sessionStorage.getItem("cust_id") ? navigate("/booking") : navigate('/login')}}
          />
        </div>
        <div className="hc-wrapper" style={{ width: "60%" }}>
          <h1 className="hc-dentist-name">{name}</h1>
          <p className="hc-intro">{children}</p>
          <p className="hc-intro">
            {year ? `Experience : ${year} years` : `Price : ${price}`}
          </p>
        </div>
      </div>
    </>
  );
}

export default HeroCard;
