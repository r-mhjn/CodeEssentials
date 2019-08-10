const bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const myKey = process.env.SECRET;

// Importing routes
const profileRouter = require('./userRoutes/profile');
const challengeRouter = require('./userRoutes/challenges');
const questionRouter = require('./userRoutes/questions');

// adding on the the strategy
require("../strategies/userAuth")(passport);

// Import Schema for User to Register
const User = require("../models/User");

// @type    GET
// @route   /user
// @desc    just for testing
// @access PUBLIC
router.get("/", (req, res) => {
  res.json({ test: "Auth is being tested" });
});

// @type     POST
// @route    /user/register
// @desc     route for registeration of users
// @access   PUBLIC
// The user might already be registers and may be trying to re-register so this check is a must
router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res
          .status(400)
          .json({ emailerror: "Email is already registered." });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          phoneno: req.body.phoneno
        });
        // Encrypt password using bcrypt   ...here 10 = saltRounds
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json("user added!" + user)) //TODO: dont send user
              .catch(err =>
                console.log("error while saving the user to database" + err)
              );
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @type     POST
// @route    /user/login
// @desc     route for login of users
// @access   PUBLIC

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ emailErr: "User not found with this email" });
      }
      // if the user is present then we must compare the user
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(isCorrect => {
            if (isCorrect) {
              //res.json({success: "user logged in sucessfully"});
              // use/creating payload and create token for user
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.name
              };
              jsonwt.sign(payload, myKey, { expiresIn: "3h" }, (err, token) => {
                if (err) {
                  throw err;
                } else {
                  return res.json({
                    sucess: true,
                    token: "Bearer " + token
                  });
                }
              });
            } else {
              return res
                .status(400)
                .json({ passwordErr: "Password is not correct" });
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

// router.post("/login", (req, res, next) => {
//     console.log(req.body);
//   passport.authenticate(
//     "login-strategy",
//     {
//       session: false
//     },
//     (err, user, info) => {
//       if (err) {
//         return res.status(400).json(err);
//       }
//       if (user) {
//         const payload = {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           username: user.name
//         };
//         jsonwt.sign(payload, myKey, { expiresIn: "1h" }, (err, token) => {
//           if (err) {
//             throw err;
//           } else {
//             return res.json({
//               sucess: true,
//               token: "Bearer " + token
//             });
//           }
//         });
//       }
//     }
//   )(req, res, next);
// });

router.use('/profile',passport.authenticate("jwt", { session: false }),profileRouter);
router.use('/challenges',passport.authenticate("jwt", { session: false }),challengeRouter);
router.use('/questions',passport.authenticate("jwt", { session: false }),questionRouter);

module.exports = router;
