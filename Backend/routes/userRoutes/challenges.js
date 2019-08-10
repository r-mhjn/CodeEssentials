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
// @route    /user/challenges/:challengeId
// @desc     route to delete a challenge
// @access   PRIVATE   //TODO: this route must be placed into the admin panel
router.delete("/:challengeId", (req, res) => {
  Challenge.findOneAndDelete({ _id: req.params.challengeId }) //TODO: findByIdAndDelete
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

// @type     POST
// @route    /user/challenges/comment/:challengeId
// @desc     route to add a comment on a challenge
// @access   PRIVATE

router.post("/comment/:challengeId", (req, res) => {
  let comment = req.body.comment;
  Challenge.findById(req.params.challengeId)
    .then(challenge => {
      console.log(challenge);
      console.log(req.body);
      const newComment = {
        user: req.user.id,
        text: comment,
        name: req.user.username
      };
      challenge.comments.push(newComment);
      challenge
        .save()
        .then(challenge => {
          res.json(challenge);
        })
        .catch(err =>
          console.log(
            "Error while saving the comment on a challenge to database " + err
          )
        );
    })
    .catch(err =>
      console.log("Error finding the challenge to comment on " + err)
    );
});

// @type     DELETE
// @route    /user/challenges/comment/:challengeId/:commentId
// @desc     route to add a delete comment on a challenge
// @access   PRIVATE

router.delete("/comment/:challengeId/:commentId", (req, res) => {
  Challenge.findById(req.params.challengeId)
    .then(challenge => {
      challenge.comments = challenge.comments.filter(
        comment => comment._id != req.params.commentId
      );
      challenge
        .save()
        .then(challenge => {
          res.json(challenge);
        })
        .catch(err =>
          console.log(
            "Error while saving to database after deleting a comment on a challenge"
          )
        );
    })
    .catch(err =>
      console.log("Error while finding the challenge to delete comment")
    );
});

// @type     POST
// @route    /user/challenges/comment/like/:challengeId/:commentId
// @desc     route to add a like a commment on a challenge
// @access   PRIVATE

router.post("/comment/like/:challengeId/:commentId", (req, res) => {
  Challenge.findById(req.params.challengeId)
    .then(challenge => {
      let index = -1;
      // console.log(challenge.comments.length);
      for (let i = 0; i < challenge.comments.length; i++) {
        if (challenge.comments[i]._id == req.params.commentId) {
          index = i;
          break;
        }
      }
      let likeIndex = -1;
      // console.log(challenge.comments[index].likes.length);
      for (let i = 0; i < challenge.comments[index].likes.length; i++) {
        if (challenge.comments[index].likes[i].user == req.user.id) {
          likeIndex = i;
          break;
        }
      }
      if (likeIndex != -1) {
        challenge.comments[index].likes.splice(likeIndex, 1);
      }
      if (likeIndex == -1) {
        const like = {
          user: req.user.id
        };
        challenge.comments[index].likes.push(like);
      }
      challenge
        .save()
        .then(challenge => res.json(challenge))
        .catch(err => console.log("Error while saving the like to database"));
    })
    .catch(err => console.log("Error while finding the challenge to like"));
});

module.exports = router;
