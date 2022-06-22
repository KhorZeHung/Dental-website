import React from "react";
import "./Button.css";

const SIZES = ["btn--mobile", "btn--web-small", "btn--web-large"];

function Button({ size, round, children, btnOnClick, type}) {
  const sizeBtn = SIZES.includes(size) ? size : SIZES[1];
  const roundBtn = round ? "btn--round" : null;

  return (
    <button
      className={`btn--primary ${sizeBtn} ${roundBtn}`}
      onClick={btnOnClick}
      type={type}
    >
      {children ? children : "Book Now"}
    </button>
  );
}

export default Button;
