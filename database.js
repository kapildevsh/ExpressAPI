const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

exports.mongooseDB = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
