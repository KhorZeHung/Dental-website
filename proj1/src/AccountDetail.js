import React, { useState, useEffect } from "react";
import "./AccountDetail.css";
import Button from "./Button";
import PersonalDetail from "./PersonalDetail";
import { url } from "./Components/Data.js";
import Table from "./Table";
import axios from "axios";

function AccountDetail() {
  const [click, setClick] = useState(1);
  const [appointment, setAppointment] = useState({});

  const logout = () => {
    sessionStorage.clear();
    window.location.replace(url);
  };

  function dateTime(str) {
    let dateTimes = new Date(str);
    let date = JSON.stringify(dateTimes);
    let hour = dateTimes.getHours();
    var dayNight = "a.m.";
    if (hour > 12) {
      dayNight = "p.m.";
      hour = hour - 12
    }

    var formatHour = ("0" + hour).slice(-2);
    return date.slice(1, 11) + " " + formatHour + ":00 " + dayNight;
  }

  useEffect(() => {
    var historyObj = {};
    var futureObj = {};

    var hArray = [];
    var fArray = [];
    axios
      .post("http://localhost:3001/api/select/appointment", {
        cust_id: sessionStorage.getItem("cust_id"),
      })
      .then((response) => {
        const resArray = response.data.datas;
        resArray.forEach((array) => {
          const dateTimeNow = new Date();
          const dateTimeApp = new Date(array.a_date_time);
          array.a_date_time = dateTime(dateTimeApp);
          if (dateTimeNow.getTime() > dateTimeApp.getTime()) {
            hArray.push(array);
          } else {
            fArray.push(array);
          }
        });

        historyObj.data = hArray;
        futureObj.data = fArray;
        setAppointment({futureObj, historyObj });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Ad-container">
      <div className="Ad-title">Account Detail</div>
      <div className="Ad-btn1">
        <Button
          children="LOG OUT"
          size="btn--large"
          round="1"
          btnOnClick={logout}
        />
      </div>
      <div className="Ad-wrapper">
        <div className="Ad-selection">
          <ul className="Ad-uolist">
            <li className="Ad-list" onClick={() => setClick(1)}>
              Personal information
            </li>
            <li className="Ad-list" onClick={() => setClick(2)}>
              Appointment made
            </li>
            <li className="Ad-list" onClick={() => setClick(3)}>
              Appointment History
            </li>
          </ul>
        </div>
        <div className="Ad-information">
          {/* can add table or personal infromation below */}
          {(() => {
            if (click === 1) {
              return <PersonalDetail />;
            } else if (click === 2) {
              return <Table {...appointment.futureObj} />;
            } else {
              return <Table {...appointment.historyObj} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;
