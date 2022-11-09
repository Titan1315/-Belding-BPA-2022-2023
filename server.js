const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
//const bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: __dirname + "/views/layouts/index.hbs",
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname,  "/views/partial")

  })
);

app.set("view engine", "hbs");

const upload_data = {
  type: "",
  make: "",
  model: "",
  year: "",
  miles: 0,
  color: "",
  price: 0,
  mainPhoto: "",
  sidePhoto:"",
  backPhoto: "",
  frontInsidePhoto: "",
  backInsidePhoto: ""
};

//DATA BASE STUFF

const db = new sqlite3.Database("./db/cars.sqlite", (err) => {
  if (err) {
    console.log("Error Occurred - " + err.message);
  } else {
    console.log("DataBase Connected" );
   
    
    var whatToSend = "selectQuery";
    
    if(whatToSend == "insertQuery"){
      db.all(insertQuery, upload_data.type, upload_data.make, upload_data.model,upload_data.year, upload_data.miles, upload_data.color, upload_data.price, upload_data.mainphoto, upload_data.sidephoto, upload_data.backPhoto, upload_data.frontInsidePhoto, upload_data.backInsidePhoto,function(err, table) {
        console.log(table);
        });}
    else if(whatToSend == "selectQuery"){
       db.all(selectQuery , function(err, table) {
        console.log(table);
        });  
    }else if(whatToSend == "createQuery"){
      db.all(createQuery , function(err, table) {
        console.log(table);
        });
      
    }else if(whatToSend == "randQuery"){
      db.all(randQuery , function(err, table) {
        console.log(table);
        });
      
    }else if(whatToSend == "dropQuery"){
      db.all(dropQuery , function(err, table) {
        console.log(table);
        });
      
    }
    
  }});

var createQuery =
  "CREATE TABLE CARS ( ID INTEGER PRIMARY KEY AUTOINCREMENT, TYPE VARYING CHARACTER(5), MAKE VARYING CHARACTER(20), MODEL VARYING CHARACTER(20), YEAR VARYING CHARACTER(20) , MILES INTEGER, COLOR VARYING CHARACTER(20), PRICE INTEGER, MAINPHOTO VARYING CHARACTER(255), SIDEPHOTO VARYING CHARACTER(255), BACKPHOTO VARYING CHARACTER(255), FRONTINSIDEPHOTO VARYING CHARACTER(255), BACKINSIDEPHOTO VARYING CHARACTER(255) );";
var insertQuery = "INSERT INTO CARS (TYPE, MAKE, MODEL, YEAR, MILES, COLOR, PRICE, MAINPHOTO, SIDEPHOTO, BACKPHOTO, FRONTINSIDEPHOTO, BACKINSIDEPHOTO)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var selectQuery = "SELECT * FROM CARS;";
var dropQuery = "DROP TABLE  CARS;";
var randQuery = "DELETE FROM CARS WHERE id= 4;";
function getData() {
  console.log("ran start");
  db.run(createQuery);
  console.log("DB RAN");
}

/*  
 This is where we're calling the template, and passing our sample data along.
*/
app.get("/", function (req, res) {
  res.render("main", upload_data);
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
  upload_data.color = req.body.color;
  upload_data.price = req.body.price;
  upload_data.mainPhoto = req.body.main_photo;
  upload_data.sidePhoto = req.body.side_photo;
  upload_data.backPhoto = req.body.back_photo;
  upload_data.frontInsidePhoto = req.body.Front_inside_photo;
  upload_data.backInsidePhoto = req.body.back_inside_photo;
  db.all(insertQuery, upload_data.type, upload_data.make, upload_data.model, upload_data.year, upload_data.miles, upload_data.color, upload_data.price, upload_data.mainphoto, upload_data.sidephoto, upload_data.backPhoto, upload_data.frontInsidePhoto, upload_data.backInsidePhoto,function(err, table) {
    });
  db.all(selectQuery , function(err, table) {
        console.log(table);
        }); 
  console.log(upload_data);
  res.redirect("/upload");
});

app.listen(process.env.PORT);
