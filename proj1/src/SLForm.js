import React, { useState } from "react";
import Button from "./Button";
import "./SLForm.css";
import axios from "axios";
import SignupInfoCheck from "./Components/InfoChecking/SignupInfoCheck";
import LoginInfoChecking from "./Components/InfoChecking/LoginInfoChecking";
import { useNavigate } from "react-router-dom";
import { url } from "./Components/Data";

function SLForm({ styleSLForm }) {
  const navigate = useNavigate();

  const keyword1 = "login";
  const [PNum, setPNum] = useState("");
  const [Name, setName] = useState("");
  const [RPassword, setRPassword] = useState("");
  const [Password, setPassword] = useState("");

  //responsive div for sign up and login information
  var element = document.getElementById("alter");

  const submitLogin = () => {
    //not refreshing the page while pressing submit button
    const Fform = document.getElementById("f-form");
    function handleForm(event) {
      event.preventDefault();
    }
    Fform.addEventListener("submit", handleForm);

    const check = LoginInfoChecking(PNum, Password);
    if (check.error) {
      element.classList.remove("f-alter-success");
      element.classList.add(check.class);
      element.innerHTML = check.text;
    } else {
      axios
        .post("http://localhost:3001/api/get/login", check.datas)
        .then((response) => {
          if (!response.data.get) {
            element.classList.remove("f-alter-success");
            element.classList.add("f-alter-error");
            element.innerHTML = response.data.err;
            console.log(response.data.err);
          } else if (response.data.get) {
            element.classList.remove("f-alter-error");
            element.classList.add("f-alter-success");
            element.innerHTML = "Successfully login";

            //set session for cust_name and cust_id
            window.sessionStorage.setItem(
              "cust_name",
              response.data.datas.name
            );
            window.sessionStorage.setItem("cust_id", response.data.datas.id);
            window.sessionStorage.setItem("cust_pnum", PNum);

            //will navigate to home page in 1 seconds
            setTimeout(() => {
              window.location.replace(url);
            }, 1000);

          } else {
            element.classList.remove("f-alter-success");
            element.classList.add("f-alter-error");
            element.innerHTML = "Something when wrong";
          }
        });
    }
  };

  const submitSignup = () => {
    const check = SignupInfoCheck(Name, PNum, Password, RPassword);
    
    //not refreshing the page while pressing submit button
    const Fform = document.getElementById("f-form");
    function handleForm(event) {
      event.preventDefault();
    }
    Fform.addEventListener("submit", handleForm);

    if (check.error) {
      element.classList.remove("f-alter-success");
      element.classList.add(check.class);
      element.innerHTML = check.text;
    } else {
      axios
        .post("http://localhost:3001/api/insert/signup", check.datas)
        .then((response) => {
          if (response.data.insert) {
            element.classList.remove("f-alter-error");
            element.classList.add("f-alter-success");
            element.innerHTML = "Successfully sign-up";
            window.scrollTo(0, 0);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            element.classList.remove("f-alter-success");
            element.classList.add("f-alter-error");
            element.innerHTML = response.data.err;
          }
        });
    }
  };

  return (
    <div className="f-container">
      <div className="f-title">
        <h2>{styleSLForm === keyword1 ? "Log-in" : "Sign-up"}</h2>
      </div>
      <form className="f-form" id="f-form" method="post">
        <label htmlFor="PNum" className="f-label">
          Phone number
        </label>
        <input
          type="text"
          name="PNum"
          className="f-input"
          placeholder="Phone number"
          onChange={(e) => setPNum(e.target.value)}
        />
        <label htmlFor="Password" className="f-label">
          Password
        </label>
        <input
          type="password"
          name="Password"
          className="f-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {styleSLForm === keyword1 ? (
          null
        ) : (
          <>
            <label htmlFor="PasswordConfirm" className="f-label">
              Repeat password
            </label>
            <input
              type="password"
              name="PasswordConfirm"
              className="f-input"
              placeholder="Repeat Password"
              onChange={(e) => setRPassword(e.target.value)}
            />
            <label htmlFor="Name" className="f-label">
              Name
            </label>
            <input
              type="text"
              name="Name"
              className="f-input"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
        <div className="f-btn">
          <Button
            children={styleSLForm === keyword1 ? "LOG-IN" : "SIGN-UP"}
            size="btn--large"
            round="1"
            btnOnClick={styleSLForm === keyword1 ? submitLogin : submitSignup}
          />
        </div>

        {styleSLForm === keyword1 ? (
          <>
            <div className="f-words">
              New patient ?{" "}
              <a href="/signup" className="f-link">
                Sign Up
              </a>{" "}
              here to get an account
            </div>
          </>
        ) : (
          <>
            <div className="f-words">
              Already have an account ?{" "}
              <a href="/login" className="f-link">
                Log in
              </a>{" "}
              here
            </div>
          </>
        )}
        <div id="alter"></div>
      </form>
    </div>
  );
}

export default SLForm;
