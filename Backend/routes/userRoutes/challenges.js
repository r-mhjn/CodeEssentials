const express = require("express");
const router = express.Router();

const Challenge = require("../../models/Challenge");

const User = require("../../models/User");

// @type     GET
// @route    /user/challenges
// @desc     route to get all the challenges
// @access   PRIVATE

router.get("/", (req, res) => {
  Challenge.find()
    .then(challenges => res.json(challenges))
    .catch(err => res.json({ noChallenges: "NO challenges to display " }));
});

// @type     POST
// @route    /user/challenges
// @desc     route to add a challenges
// @access   PRIVATE   //TODO: this route must be placed into the admin panel

router.post("/", (req, res) => {
  console.log(req.body);
  const newChallenge = new Challenge({
    title: req.body.title,
    challengeStatement: req.body.statement
  });

  newChallenge
    .save()
    .then(challenge => res.json(challenge))
    .catch(err =>
      console.log("unable to push the new challenge to the database " + err)
    );
});

// @type     DELETE
// @route    /user/challenges/:quesId
// @desc     route to delete a challenge
// @access   PRIVATE   //TODO: this route must be placed into the admin panel
router.delete("/:quesId", (req, res) => {
  Challenge.findOneAndDelete({ _id: req.params.quesId })    //TODO: findByIdAndDelete
    .then(challenge => {
      challenge
        .save()
        .then(challenge => {
          res.json(challenge);
        })
        .catch(err =>
          console.log("Error while saving to database after deletion" + err)
        );
    })
    .catch(err => console.log("Error while finding the challenge"));
});

module.exports = router;
