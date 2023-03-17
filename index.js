const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { initializingPassport, jwtOptions } = require("./passport");
const { mongooseDB } = require("./database");
const { Users } = require("./models/userModel");
const routes = require("./routes/Auth");

const app = express();
  mongooseDB();
  initializingPassport(passport);
  app.use(passport.initialize());
  app.use(express.json()); 

  app.use("/", routes);

   app.listen(3000, () => {console.log("app is working");});

   app.get('/test',(req,res)=>{
    res.send("api test")
   })
