import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./BookingForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function BookingForm() {
  //get date for today, set for min date appointment date
  const dateToday = JSON.stringify(new Date()).slice(1, 11);

  //date max for input, 3 years after today
  const date3year =
    dateToday.slice(0, 2) +
    (parseInt(dateToday.slice(2, 4)) + 3) +
    dateToday.slice(4, 11);

  const navigate = useNavigate();

  const [date, setDate] = useState(dateToday);
  const [bookTime, setBookTime] = useState([]);

  const [dentist, setDentist] = useState(1);
  const [treatment, setTreatment] = useState(1);
  const [time, setTime] = useState("10:00");
  const [checked, setChecked] = useState({ Khor: true, Sandy: false });
  const [checkedTreatment, setCheckedTreatment] = useState({
    Brace: true,
    Dental_Filling: false,
    Dental_Implantants: false,
    Surgery: false,
    Oral_Hygiene: false,
    Teeth_Whitening: false,
  });

  var times = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  useEffect(() => {
    setBookTime([]);
    axios
      .post("http://localhost:3001/api/select/datetime/", { date: date })
      .then((response) => {
        if (!response.data.select) {
          navigate("/error");
        } else {
          const res = response.data.dateTime;

          res.map((array) => {
            var dateTime = new Date(array.a_date_time);
            var hour = dateTime.getHours() + ":00";
            var index = times.indexOf(hour);
            setBookTime((prevState) => [...prevState, index]);
            return bookTime;
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const submitApp = () => {
    const datas = {
      dentist: dentist,
      treatment: treatment,
      dateTime: date + " " + time,
      cust_id: sessionStorage.getItem("cust_id"),
    };

    axios
      .post("http://localhost:3001/api/insert/appointment/", datas)
      .then((response) => {
        if (response.data.insert) {
          navigate("/success/appointment");
        } else {
          navigate("/error");
        }
      });
  };

  const changeRadio = (e) => {
    setChecked(() => {
      return {
        Khor: false,
        Sandy: false,
        [e.target.value]: true,
      };
    });
  };

  const changeRadioTreatment = (e) => {
    setCheckedTreatment(() => {
      return {
        Brace: false,
        Dental_Filling: false,
        Dental_Implantants: false,
        Surgery: false,
        Oral_Hygiene: false,
        Teeth_Whitening: false,
        [e.target.value]: true,
      };
    });
  };

  return (
    <div className="bf-container">
      <div className="bf-title">
        <h2>Book online</h2>
      </div>
      <div className="bf-wrapper">
        <form action="/" className="bf-form" method="post">
          <div className="bf-s-container">
            <div className="bf-items">
              <label htmlFor="AppointmentDate" className="bf-label">
                Appointment data
              </label>
              <input
                type="date"
                min={dateToday}
                max={date3year}
                className="bf-input"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="bf-items">
              <label htmlFor="AppointmentTime" className="bf-label">
                Appointment time
              </label>
              <select
                name="AppointmentTime"
                className="bf-input"
                onChange={(e) => setTime(e.target.value)}
              >
                {times.map((time) => {
                  return (
                    <option
                      value={time + ":00"}
                      key={times.indexOf(time)}
                      disabled={
                        bookTime.includes(times.indexOf(time)) ? true : null
                      }
                    >
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="bf-s-container">
            <div className="bf-items">
              <label htmlFor="Appoint-Dentist" className="bf-label">
                Appoint Dentist
              </label>
              <div className="bf-radio">
                <input
                  type="radio"
                  id="Mr.Khor"
                  value="Khor"
                  onChange={(e) => {
                    changeRadio(e);
                    setDentist(1);
                  }}
                  checked={checked.Khor}
                />
                  <label htmlFor="Mr.Khor">Mr.Khor</label> {" "}
                <input
                  type="radio"
                  id="Ms.Sandy"
                  value="Sandy"
                  onChange={(e) => {
                    changeRadio(e);
                    setDentist(2);
                  }}
                  checked={checked.Sandy}
                />
                  <label htmlFor="Mr.Ma">Ms.Sandy</label>
              </div>
            </div>

            <div className="bf-items">
              <label htmlFor="Treatment" className="bf-label">
                Treatment
              </label>
              <div className="bf-radio">
                <label htmlFor="Brace">
                  <input
                    type="radio"
                    id="Brace"
                    value="Brace"
                    onChange={(e) => {
                      changeRadioTreatment(e)
                      setTreatment(1)}}
                    checked = {checkedTreatment.Brace}
                  />
                  Brace
                </label>
                 {" "}
                <label htmlFor="Dental Filling">
                  <input
                    type="radio"
                    id="Dental Filling"
                    value="Dental_Filling"
                    onChange={(e) => {
                      changeRadioTreatment(e)
                      setTreatment(3)}}
                    checked = {checkedTreatment.Dental_Filling}
                  />{" "}
                  Dental Filling
                </label>
                 {" "}
                <label htmlFor="Dental Implantans">
                  <input
                    type="radio"
                    id="Dental Implantans"
                    value="Dental_Implantants"
                    onChange= {(e) => {
                      changeRadioTreatment(e)
                      setTreatment(5)}}
                    checked = {checkedTreatment.Dental_Implantants}
                  />{" "}
                  Dental Implantants
                </label>
              </div>
              <div className="bf-radio">
                 {" "}
                <label htmlFor="Surgery">
                  <input
                    type="radio"
                    id="Surgery"
                    value="Surgery"
                    onChange={(e) => {
                      changeRadioTreatment(e)
                      setTreatment(6)}}
                    checked = {checkedTreatment.Surgery}
                  />{" "}
                  Surgery
                </label>
                 {" "}
                <label htmlFor="Oral Hygiene">
                  <input
                    type="radio"
                    id="Oral Hygiene"
                    value="Oral_Hygiene"
                    onChange={(e) => {
                      changeRadioTreatment(e)
                      setTreatment(4)}}
                    checked = {checkedTreatment.Oral_Hygiene}
                  />
                  Oral Hygiene
                </label>
                 
                <label htmlFor="Teeth Whitening">
                  <input
                    type="radio"
                    id="Teeth Whitening"
                    value="Teeth_Whitening"
                    onChange={(e) => {
                      changeRadioTreatment(e)
                      setTreatment(2)}}
                    checked = {checkedTreatment.Teeth_Whitening}
                  />
                  Teeth Whitening
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="bf-btn">
          <Button
            children="book now"
            size="btn-large"
            round="1"
            btnOnClick={() => submitApp()}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
