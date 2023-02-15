     const { Users } = require("./model/userModel");
        const passport = require("passport");
        const JwtStrategy = require("passport-jwt").Strategy;
        const ExtractJwt = require("passport-jwt").ExtractJwt;
   

        const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
        };
       

        exports.initializingPassport = (passport) => {
            passport.use(
                new JwtStrategy(jwtOptions, function(jwt_payload, done) {
                  Users.findOne({email:jwt_payload.email},(err,user)=>{
               
                    if(err){
                        return done(err,false);
                    }
                   
                      if (user) {
                        return done(null, user);
                      }
                      else{
                        return done(null, false);
                      }
                      
                    });
                    
                })
              );
        };
        exports.jwtOptions = jwtOptions;
