const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User");

// @type     GET
// @route    /user/profile
// @desc     route for user profile
// @access   PRIVATE

router.get("/", (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    profilepic: req.user.profilepic
  });
});

// @type     PUT
// @route    /user/profile/resetpassword/:userId
// @desc     route for user reset password
// @access   PRIVATE

router.put("/resetpassword/:userId", (req, res) => {
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  console.log(oldPassword, newPassword, req.user.password);
  User.findById(req.params.userId)
    .then(user => {
      console.log(req.user.password);
      bcrypt
        .compare(oldPassword, req.user.password)
        .then(isCorrect => {
          if (isCorrect) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) {
                  //   throw err;
                  res
                    .status(400)
                    .json({ hashErr: "error while generating hash" });
                }
                user.password = hash;
                user
                  .save()
                  .then(user => {
                    res.json(user);
                  })
                  .catch(err => res.status(400).json(err));
              });
            });
          } else {
            return res
              .status(400)
              .json({ passwordErr: "Password did not match" });
          }
        })
        .catch(err =>
          res
            .status(400)
            .json({ passwordErr: "Password didnt not match" + err })
        );
    })
    .catch(err => console.log("compareErr: Error while comparing"));
});

// @type     PUT
// @route    /user/profile/update/:userId
// @desc     route to update user profile
// @access   PRIVATE

router.put("/update/:userId", (req, res) => {
  let profilepic = req.body.profilepic;
  // console.log(typeof profilepic);
  let username = req.body.username;
  let phoneno = req.body.phoneno;
  let hasChanged = false;
  console.log(req.body);
  User.findById(req.params.userId)
    .then(user => {
      // res.json(user)
      if (user.profilepic != profilepic) {
        if(profilepic!=''){
        user.profilepic = profilepic;}
        hasChanged = true;
      }
      if (user.username != username) {
        user.username = username;
        hasChanged = true;
      }
      if (user.phoneno != phoneno) {
        user.phoneno = phoneno;
        hasChanged = true;
      }
      if (hasChanged) {
        user
          .save()
          .then(user => res.json(user))
          .catch(err =>
            console.log("Error while saving updated profile to database" + err)
          );
      }
    })
    .catch(err => console.log("Error while finding user to update profile"));
});

module.exports = router;
