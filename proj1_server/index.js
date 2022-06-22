const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "proj1-db",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.listen(3001);

app.get("/", (req, res) => {
  res.send("Hello world and try to make something usefull");
});

app.post("/api/insert/signup", (req, res) => {
  const custName = req.body.Name;
  const custPNum = req.body.PNum;
  const custPword = req.body.Password;

  const sqlSelect = "SELECT * FROM customer WHERE cust_pnum = ?";

  db.query(sqlSelect, [custPNum], (error, response) => {
    if (error) {
      res.send(error);
    } else if (response.length > 0) {
      res.send({ insert: false, err: "Phone Number is registered" });
    } else {
      bcrypt.hash(custPword, saltRounds, (err, hash) => {
        if (err) {
          res.send({ insert: false, err: err });
        } else {
          const sqlInsert =
            "INSERT INTO customer (cust_name, cust_password, cust_pnum) VALUES (?,?,?);";
          db.query(sqlInsert, [custName, hash, custPNum], (err, result) => {
            if (err) {
              res.send({ insert: false, err: err });
            } else {
              res.send({ insert: true });
            }
          });
        }
      });
    }
  });
});

app.post("/api/get/login", (req, res) => {
  const custPNum = req.body.PNum;
  const custPword = req.body.Password;
  const selectQuery = "SELECT * FROM customer WHERE cust_pnum = ?;";
  db.query(selectQuery, custPNum, (err, response) => {
    if (err) {
      res.send({
        get: false,
        err: "err1",
      });
    } else if (response.lenth < 1) {
      res.send({
        get: false,
        err: "No such user",
      });
    } else {
      bcrypt.compare(custPword, response[0].cust_password, (error, result) => {
        if (err) {
          res.send({
            get: false,
            err: "err2",
          });
        } else if (result) {
          res.send({
            get: true,
            datas: {
              name: response[0].cust_name,
              id: response[0].cust_id,
            },
          });
        } else {
          res.send({
            get: false,
            err: "Wrong password",
          });
        }
      });
    }
  });
});

app.post("/api/select/appointment/", (req, res) => {
  const Cid = req.body.cust_id;
  const selectQuery = `SELECT dentist.d_name, treatment.t_name, appointment.a_date_time, appointment.a_id 
  FROM appointment INNER JOIN dentist ON appointment.d_id = dentist.d_id INNER JOIN treatment ON 
  appointment.t_id = treatment.t_id WHERE appointment.cust_id = ?;`;
  db.query(selectQuery, Cid, (err, result) => {
    if (err) {
      res.send({
        select: false,
        err: err,
      });
    } else {
      res.send({
        select: true,
        datas: result,
      });
    }
  });
});

app.post("/api/select/datetime/", (req, res) => {
  const date = req.body.date;
  const selectQuery =
    "SELECT a_date_time, a_id FROM appointment WHERE a_date_time LIKE '" +
    date +
    "%' ";
  db.query(selectQuery, (err, result) => {
    if (err) {
      res.send({
        select: false,
        err: err,
      });
    } else {
      res.send({
        select: true,
        dateTime: result,
      });
    }
  });
});

app.post("/api/insert/appointment/", (req, res) => {
  const dentist = req.body.dentist;
  const treatment = req.body.treatment;
  const dateTime = req.body.dateTime;
  const cust_id = req.body.cust_id;
  const sqlInsert =
    "INSERT INTO appointment (cust_id, t_id, d_id, a_date_time) VALUES (?, ?, ?, ?);";
  db.query(sqlInsert, [cust_id, treatment, dentist, dateTime], (err) => {
    if (err) {
      res.send({ insert: false, err: err });
    } else {
      res.send({ insert: true });
    }
  });
});
