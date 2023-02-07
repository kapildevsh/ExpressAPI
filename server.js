const express = require('express');
const passport = require('passport');

const {initializingPassport}= require('./auth');
const {mongooseDB} = require('./database');
const {Users} = require('./model/userModel')
const app = express();
mongooseDB();
initializingPassport(passport);
app.use(passport.initialize());
app.use(express.json());
app.listen(3000,()=>{
    console.log("app is working");
}),

app.get("/",(req,res)=>{
    res.send("hello"); 
});
app.post("/login",passport.authenticate,(req,res)=>{
    res.send("hello"); 
});

app.post('/register',async(req,res)=>{
   const user = await Users.findOne({email: req.body.email});
   if(user){
    return res.status(409).send("user already exist");
   }
   const newUser = await Users.create(req.body);
   
   const token = passport.authenticate('jwt', { session: false },(req, res, () => {
    res.status(200).send({
    
      email: newUser.email,
      token: 'Bearer ' + token
    });
  }));
});
   
   
