const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy =  require('passport-local');
const User  = require("../models/User");   // mongoose.model("myUser");
// const myKey = require('../setup/myurl');  // Required this to fetch the secret


var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

module.exports = (passport) =>{

 passport.use(new JwtStrategy(options, (jwt_payload, done)=>{
   User.findById(jwt_payload.id)
   .then( (user)=>{
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
     })   
  .catch( (err)=>console.log(err));

 }));

//  passport.use('login-strategy', new localStrategy({
//      usernameField:'email'
//  },(email, password, done)=>{
//      console.log(email,password);
//      User.findOne({ email })
//      .then(user => {
//         done(null,user);
//       // if the user is present then we must compare the user
//       console.log('user mil gya');
//       if (user) {
//         bcrypt
//           .compare(password, user.password)
//           .then(isCorrect => {
//               console.log('password matching');
//             if (isCorrect) {
//               //res.json({success: "user logged in sucessfully"});
//               // use/creating payload and create token for user
//               done(null,user);
//             } else {
//               done(null,user);
//             }
//           })
//           .catch(err => done(err,false));
//       }
//       else{
//           done(null,false);
//       }
//     })
//     .catch(err => done(err,false));
//  }))

}