import React from "react";
import HeroCard from "./HeroCard";
import pic from "./Components/pic/main-pic-1.jpg";
import "./HeroMain.css";
import { FaWhatsapp } from "react-icons/fa";

function HeroMain({ dataDentist1, dataDentist2 }) {
  const obj1 = dataDentist1;
  const obj2 = dataDentist2;
  return (
    <>
      <div className="Hm-container">
        <div className="Hm-wrapper">
          <div className="Hm-items">
            <img src={pic} alt="dental working" className="Hm-img-semiround" />
            <a href="https://api.whatsapp.com/send?phone=601110740821" target = "_blank" rel="noreferrer">
              <button type="button" className="Hm-btn">
                <FaWhatsapp />
                Whatsapp
              </button>
            </a>
          </div>
        </div>

        <div className="Hm-wrapper Hm-herocard">
          <HeroCard {...obj1} />
          <HeroCard {...obj2} />
        </div>
      </div>
    </>
  );
}

export default HeroMain;
