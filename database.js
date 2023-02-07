const mongoose = require('mongoose');

 exports.mongooseDB=()=>{
    mongoose.connect("mongodb://localhost:27017/Kapil").then(()=>{
        console.log("Database Connected Successfully");
    }).catch((err)=>{
        console.log(err)
    });

 };

 

