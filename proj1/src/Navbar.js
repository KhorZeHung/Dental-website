import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiSteelwingEmblem } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [click, setClick] = useState(false);
  const [mobile, setMobile] = useState(false);

  const login = sessionStorage.getItem("cust_name");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const checkWebWidth = () => {
    if (window.innerWidth >= 960) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  };
  useEffect(() => {
    checkWebWidth();
    window.addEventListener("resize", checkWebWidth);
    return () => {
      window.removeEventListener("resize", checkWebWidth);
    };
  }, []);

  return (
    <>
      <div className="nbSec">
        <div className="nb-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <GiSteelwingEmblem className="navbar-icon" />
            Mr.Khor
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/aboutus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/treatment"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Treatment
              </Link>
            </li>
            <li className="nav-item">
              <Link to={login ? "/account":"/login"} className="nav-links" onClick={closeMobileMenu}>
                {login ? "Account" : "Log-in"}
              </Link>
            </li>
            <li className="nav-btn">
              <Link
                to={login ? "/booking" : "/login"}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Button
                  children="book online"
                  type="button"
                  size={mobile ? "btn--mobile" : "btn--large"}
                  round="1"
                ></Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
