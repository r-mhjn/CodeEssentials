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
// @access   PRIVATE
router.post("/", (req, res) => {
  const newQuestion = new Question({
    question: req.body.question,
    description: req.body.description,
    code: req.body.code
  });
  newQuestion
    .save()
    .then(question => res.json(question))
    .catch(err =>
      console.log("Error while saving the question to database " + err)
    );
});

// @type     DELETE
// @route    /user/question/:questionId
// @desc     route to delete a question
// @access   PRIVATE

router.delete("/:questionId", (req, res) => {
  Question.findByIdAndDelete(req.params.questionId)
    .then(question => {
      res.json(question);
    })
    .catch(err => console.log("Error while finding a question to delete"));
});

// @type     POST
// @route    /user/questions/comment/:questionId
// @desc     route to post a comment on a question
// @access   PRIVATE

router.post("/comment/:questionId", (req, res) => {
  let comment = req.body.comment;

  Question.findById(req.params.questionId)
    .then(question => {
      const newComment = {
        user: req.user.id,
        text: comment,
        name: req.user.username
      };
      question.comments.push(newComment);
      question
        .save()
        .then(question => res.json(question))
        .catch(err =>
          console.log("Error while saving the comment to the database")
        );
    })
    .catch(err => console.log("Error while finding a question to add comment"));
});

// @type     DELETE
// @route    /user/question/:questionId/:commentId
// @desc     route to delete a particular comment of a question
// @access   PRIVATE

router.delete("/:questionId/:commentId", (req, res) => {
  Question.findById(req.params.questionId)
    .then(question => {
      question.comments = question.comments.filter(
        comment => comment._id != req.params.commentId
      );
      question
        .save()
        .then(question => {
          res.json(question);
        })
        .catch(err => console.log("Error while saving after deleting comment"));
    })
    .catch(err =>
      console.log(
        "Error while finding question to delete comment on the question"
      )
    );
});

//TODO: Add a route to upvote a question

// @type     POST
// @route    /user/question/:questionId
// @desc     route upvote/downvote a question
// @access   PRIVATE     // TODO: Need to test this route with multiple logged in users

router.post("/upvote/:questionId", (req, res) => {
  Question.findById(req.params.questionId)
    .then(question => {
      // res.json(question);
      // console.log(question);
      let index = -1;
      for (let i = 0; i < question.upvotes.length; i++) {
        if (question.upvotes[i].user == req.user.id) {
          index = i;
          break;
        }
      }
      if (index != -1) {
        question.upvotes.splice(index, 1);
      }
      if (index == -1) {
        const upvote = {
          user: req.user.id
        };
        question.upvotes.push(upvote);
      }
      question
        .save()
        .then(question => {
          res.json(question);
        })
        .catch(err =>
          console.log("Error while saving the upvote to database" + err)
        );
    })
    .catch(err => {
      console.log("Error while fetching the question to upvote");
    });
});

//TODO: Add a route to like a comment on a question
// @type     POST
// @route    /user/question/:questionId/:commentId
// @desc     route like a comment
// @access   PRIVATE     //TODO: This route is to be tested for multiple users

router.post("/like/:questionId/:commentId", (req, res) => {
  Question.findById(req.params.questionId)
    .then(question => {
      let index = -1;
      // console.log(question.comments.length);
      for (let i = 0; i < question.comments.length; i++) {
        if (question.comments[i]._id == req.params.commentId) {
          index = i;
          break;
        }
      }
      let likeIndex = -1;
      // console.log(question.comments[index].likes.length);
      for (let i = 0; i < question.comments[index].likes.length; i++) {
        if (question.comments[index].likes[i].user == req.user.id) {
          likeIndex = i;
          break;
        }
      }
      if (likeIndex != -1) {
        question.comments[index].likes.splice(likeIndex, 1);
      }
      if (likeIndex == -1) {
        const like = {
          user: req.user.id
        };
        question.comments[index].likes.push(like);
      }
      question
        .save()
        .then(question => res.json(question))
        .catch(err => console.log("Error while saving the like to database"));
    })
    .catch(err => console.log("Error while finding the question "+ err));
});

module.exports = router;
