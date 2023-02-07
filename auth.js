const {Users} = require('./model/userModel');
const passport =require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "secret",
  }; 


  exports.initializingPassport = (passport)=>{
    passport.use(
        new JwtStrategy(jwtOptions, async (email,passport, done) => {
            try{
                const user = await Users.findOne({email});
                if (!user) {
                 return done(null, false);
                } else if(user.password !== password) {
                 return  done(null, false);
                }
                return done(null,user);
            }
            catch(error){
                return  done(error, false); 
            }
        
        } )
      )

  };
  