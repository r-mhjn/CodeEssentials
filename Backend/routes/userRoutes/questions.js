const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Question = require("../../models/Question");

// @type     GET
// @route    /user/questions
// @desc     route get all questions
// @access   PRIVATE
router.get("/", (req, res) => {
  Question.find()
    .then(questions => {
      if (questions) {
        res.json(questions);
      } else {
        res.json({ noquestion: "No questions to display" });
      }
    })
    .catch(err => console.log("Error while fetching all questions"));
});


// @type     POST
// @route    /user/questions
// @desc     route to post a question
// @access   PRIVATE    // TODO: this route still needs to be tested
router.post("/", (req, res) => {
  const newQuestion = new Question({
    question: req.body.question,
    description: req.body.description,
    code: req.body.code
  });
  newQuestion
    .save()
    .then((question) => res.json(question))
    .catch(err => console.log("Error while saving the question to database "+ err));
});




module.exports = router;
