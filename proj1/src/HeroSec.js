import React, { useEffect, useState } from "react";
import "./HeroSec.css";
import HeroCard from "./HeroCard";
import Button from "./Button";

function HeroSec({ style, title, text1, text2, datas }) {
  //Check if webstie need to show aboutus pages or treatment page
  const keyword = "aboutUs";

  //State for show more or show less
  const [showMore, setShowMore] = useState(false);

  //check screen width for better treatment presentation
  const [screenWidth, setScreenWidth] = useState(true);

  const checkInnerWidth = () => {
    if (window.innerWidth > 860) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
  };

  useEffect(() => {
    checkInnerWidth()
    window.addEventListener("resize", checkInnerWidth);

    return () => {
      window.removeEventListener("resize", checkInnerWidth);
    };
  }, []);

  return (
    <>
      <div className="Hs-title">
        <h2>{title}</h2>
      </div>
      <div className="Hs-container">
        <div className="Hs-wrapper">
          {style === keyword ? (
            <p className="Hs-about">{text1}</p>
          ) : (
            <>
              <HeroCard {...datas[0]} />
              <HeroCard {...datas[1]} />
              {(showMore && screenWidth) ? <HeroCard {...datas[4]} /> : null}
            </>
          )}
        </div>
        <div
          className={showMore && style !== keyword ? "line long" : "line short"}
        ></div>

        <div className="Hs-wrapper">
          {style === keyword ? (
            <p className="Hs-about">{text2}</p>
          ) : (
            <>
              <HeroCard {...datas[2]} />
              <HeroCard {...datas[3]} />
              {showMore && (!screenWidth )? <HeroCard {...datas[4]} />: null }
              {showMore ? <HeroCard {...datas[5]} /> : null}
            </>
          )}
        </div>
      </div>
      <div className="Hs-btn">
        {style === keyword ? null : (
          <Button
            size="btn--large"
            round="1"
            children={showMore ? "Show less" : "Show more"}
            btnOnClick={() => {setShowMore(!showMore)}}
          />
        )}
      </div>
    </>
  );
}

export default HeroSec;
