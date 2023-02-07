const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID : {
       type: mongoose.Types.ObjectId,
       default:mongoose.Types.ObjectId,
       required:true,
       unique:true,
       index:true,
      
    },
    first_name:String,
    last_name:String,
    email: {
      type: String,
      required:true,
      unique:true,  
    },
    password:String,
    dob:String,
    phone_number:Number,
    
});

exports.Users= mongoose.model('Users',userSchema);
