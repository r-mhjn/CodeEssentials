const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); //to read the dotenv file containing env variables
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGOURI;
const morgan = require("morgan");

// Middleware cors = cross origin policy (using this we can send req from one server to other)
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan("short")); // a middleware for

// MiddleWare like bodyparser
app.use(express.json());

//Passport Middleware
app.use(passport.initialize());

// Bring all routes
const userRoute = require("./routes/user");
const adminRoute =  require("./routes/admin");

//actual routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);


//Connect to database
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("mongo connected sucessfully"))
  .catch(err => console.log("error connecting database"));

app.listen(port, () => console.log(`server is running at port ${port}`));
