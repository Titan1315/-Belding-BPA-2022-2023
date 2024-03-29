const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const url = require("url");
const nodemailer = require('nodemailer');
//const bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


 


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shiftinggearscars.co@gmail.com',
    pass: 'megpnfpswqvbjqqx'
  }
});



app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: __dirname + "/views/layouts/index.hbs",
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
    extname: "hbs",
  })
);

app.set("view engine", "hbs");

const upload_data = {
  type: "",
  make: "",
  model: "",
  year: "",
  miles: 0,
  Cmpg: 0,
  Hmpg: 0,
  color: "",
  price: 0,
  owners: 0,
  Cengine: 0,
  Lengine: 0,
  drive: 0,
  mainPhoto: "",
  frontPhoto: "",
  backPhoto: "",
  frontInsidePhoto: "",
  backInsidePhoto: "",
};

//DATA BASE STUFF

const db = new sqlite3.Database("./db/cars.sqlite", (err) => {
  if (err) {
    console.log("Error Occurred - " + err.message);
  } else {
    console.log("DataBase Connected");

    var whatToSend = "";

    if (whatToSend == "insertQuery") {
      db.all(
        insertQuery,
        upload_data.type,
        upload_data.make,
        upload_data.model,
        upload_data.year,
        upload_data.miles,
        upload_data.Cmpg,
        upload_data.Hmpg,
        upload_data.color,
        upload_data.price,
        upload_data.owners,
        upload_data.Cengine,
        upload_data.Lengine,
        upload_data.drive,
        upload_data.mainPhoto,
        upload_data.frontPhoto,
        upload_data.backPhoto,
        upload_data.frontInsidePhoto,
        upload_data.backInsidePhoto,
        function (err, table) {
          console.log(table);
        }
      );
    } else if (whatToSend == "selectQuery") {
      db.all(selectQuery, function (err, table) {
        console.log("select ran");
        console.log(table);
      });
    } else if (whatToSend == "createQuery") {
      db.all(createQuery, function (err, table) {
        console.log("create ran");
      });
    } else if (whatToSend == "randQuery") {
      db.all(randQuery, function (err, table) {
        console.log("rand ran");
      });
    } else if (whatToSend == "dropQuery") {
      db.all(dropQuery, function (err, table) {
        console.log("drop ran");
      });
    }
  }
});

var createQuery =
  "CREATE TABLE CARS (ID INTEGER PRIMARY KEY AUTOINCREMENT, TYPE VARYING CHARACTER(5), MAKE VARYING CHARACTER(20), MODEL VARYING CHARACTER(20), YEAR VARYING CHARACTER(20), MILES INTEGER, CMPG INTEGER, HMPG INTEGER, COLOR VARYING CHARACTER(20), PRICE INTEGER, OWNERS INTEGER, CENGINE INTEGER, LENGINE INTEGER, DRIVE INTEGER, MAINPHOTO VARYING CHARACTER(255), FRONTPHOTO VARYING CHARACTER(255), BACKPHOTO VARYING CHARACTER(255), FRONTINSIDEPHOTO VARYING CHARACTER(255), BACKINSIDEPHOTO VARYING CHARACTER(255) );";
var insertQuery =
  "INSERT INTO CARS (TYPE, MAKE, MODEL, YEAR, MILES, CMPG, HMPG, COLOR, PRICE, OWNERS, CENGINE, LENGINE, DRIVE, MAINPHOTO, FRONTPHOTO, BACKPHOTO, FRONTINSIDEPHOTO, BACKINSIDEPHOTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var selectQuery = "SELECT * FROM CARS";
var dropQuery = "DROP TABLE CARS;";
var randQuery = "DELETE FROM CARS WHERE id= 1;";
var sql;
function getData() {
  db.run(createQuery);
}

/*  
Routes for pages
*/
app.get("/", function (req, res) {
  res.render("main", {
    style: "main",
  });
});

app.get("/aboutus", function (req, res) {
  res.render("aboutus", {
    style: "aboutus",
  });
});

app.get("/contactUs", function (req, res) {
  res.render("contactUs", {
    style: "contactUs",
  });
});
app.post("/contactUs", (req, res, next) => {
  console.log("ran");
  console.log(req.body);
  
  var mailOptions = {
  from: 'shiftinggearscars.co@gmail.com',
  to: req.body.email,
  subject: 'Shifting Gears Inquiry',
  text: 'Thank you ' + req.body.firstname +" "+ req.body.lastname + ' for contacting us, a team member will get back to you shortly. \nHere is a copy of your message: \n \n ' + req.body.message
};
  
  
  
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  });
  res.redirect("/contactUs");
});

app.get("/citations", function (req, res) {
  res.render("citations", {
    style: "citations",
  });
});

app.get("/paralaxtest", function (req, res) {
  res.render("paralaxtest", {
    style: "paralaxtest",
  });
});

app.get("/BPAboutUs", function (req, res) {
  res.render("BPAboutUs", {
    style: "BPAboutUs",
  });
});

//original library querey

/*
app.get("/library", (req, res, next) => {
  sql = "SELECT * FROM CARS ";

  try {
    const quereyObject = url.parse(req.url, true).query;
    console.log(quereyObject);
    if (quereyObject.field && quereyObject.type) {
      sql += `WHERE ${quereyObject.field} LIKE '${quereyObject.type}'`;

      console.log("ran");
      console.log("sql is this " + sql);
    }
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 400, success: false, error: err });

      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: "No Match" });
      }
      //console.log(rows);
      res.render("library", {
        cars: rows,
        name: "test",
        style: "library",
      });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});*/

//library page routes

var Data = {};
var runThrough = false;

app.get("/library", (req, res, next) => {
  sql = "SELECT * FROM CARS ";

  try {
    const quereyObject = url.parse(req.url, true).query;
    if (quereyObject.type) {
      sql += `WHERE TYPE LIKE '${quereyObject.type}' OR MAKE LIKE '${quereyObject.type}' OR MODEL LIKE '${quereyObject.type}' OR  YEAR LIKE '${quereyObject.type}'`;

      console.log("sql is this " + sql);
    }
    
    db.all(sql, [], (err, rows) => {
      if (err) {
          console.log(err)
          return res.redirect("/library?error=true");
      }

      if (rows.length < 1) {
        return res.redirect("/library?error=true");
      }

      res.render("library", {
        cars: rows,
        name: "test",
        style: "library",
      });
    });
  } catch (error) {
    return res.redirect("/library?error=true");
  }
});

var id = "";

app.get("/details/:id", function (req, res) {
  var id = req.params.id;
  var fetchData = `SELECT * FROM CARS  WHERE ID LIKE ${req.params.id}`;
  var fetchedDataS;

  try {
    db.all(fetchData, [], (err, fetchedData) => {
      if (err) return res.json({ status: 400, success: false, error: err });

      if (fetchedData.length < 1) {
        return res.json({ status: 300, success: false, error: "No Match" });
      }
      fetchedDataS = fetchedData;
      console.log(fetchedDataS);
      res.render("details", {
        style: "details",
        car: fetchedDataS,
      });
    });
  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

//upload page routes

app.get("/upload", (req, res, next) => {
  res.render("upload", upload_data);
});
app.post("/upload", (req, res, next) => {
  console.log(req.body);
  upload_data.type = req.body.type;
  upload_data.make = req.body.make;
  upload_data.model = req.body.model;
  upload_data.year = req.body.year;
  upload_data.miles = req.body.miles;
  upload_data.Cmpg = req.body.Cmpg;
  upload_data.Hmpg = req.body.Hmpg;
  upload_data.color = req.body.color;
  upload_data.price = req.body.price;
  upload_data.owners = req.body.owners;
  upload_data.Cengine = req.body.Cengine;
  upload_data.Lengine = req.body.Lengine;
  upload_data.drive = req.body.drive;
  upload_data.mainPhoto = req.body.main_photo;
  upload_data.frontPhoto = req.body.front_photo;
  upload_data.backPhoto = req.body.back_photo;
  upload_data.frontInsidePhoto = req.body.Front_inside_photo;
  upload_data.backInsidePhoto = req.body.back_inside_photo;
  db.all(
    insertQuery,
    upload_data.type,
    upload_data.make,
    upload_data.model,
    upload_data.year,
    upload_data.miles,
    upload_data.Cmpg,
    upload_data.Hmpg,
    upload_data.color,
    upload_data.price,
    upload_data.owners,
    upload_data.Cengine,
    upload_data.Lengine,
    upload_data.drive,
    upload_data.mainPhoto,
    upload_data.frontPhoto,
    upload_data.backPhoto,
    upload_data.frontInsidePhoto,
    upload_data.backInsidePhoto,
    function (err, table) {
      console.log(table);
    }
  );

  db.all(selectQuery, function (err, table) {
    console.log(table);
    console.log("slected");
  });
  console.log(upload_data);
  console.log("uploaded");
  res.redirect("/upload");
});

app.listen(process.env.PORT);
