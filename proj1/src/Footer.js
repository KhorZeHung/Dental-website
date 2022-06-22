import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { GiSteelwingEmblem } from "react-icons/gi";

function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          We are not destist, but a smile maker
        </p>
        <p className="footer-subscription-text">
          Your 'smile' is our responsibility
        </p>
      </section>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <GiSteelwingEmblem className="navbar-icon" />
              Mr.Khor
            </Link>
          </div>
          <small className="website-rights">Mr.Khor © {year}</small>
          <div className="social-icons">
            <Link
              className="social-icon-link"
              to={"//www.facebook.com"}
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </Link>
            <Link
              className="social-icon-link"
              to={"//www.instagram.com"}
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              className="social-icon-link"
              to={"//www.youtube.com"}
              target="_blank"
              aria-label="Youtube"
            >
              <FaYoutube />
            </Link>
            <Link
              className="social-icon-link"
              to={"//www.whatsapp.com"}
              target="_blank"
              aria-label="Whatsapps"
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
