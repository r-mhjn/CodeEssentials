const express = require("express");
const router = express.Router();

const Course = require("../../models/Course");

//TODO: Add a course to a domain
// @type     POST
// @route    /admin/course/
// @desc     route to add a course of a particular domain
// @access   PRIVATE
router.post("/", (req, res) => {
  const newCourse = new Course({
    domain: req.body.domain,
    courseName: req.body.courseName,
    description: req.body.description
  });
  newCourse
    .save()
    .then(course => res.json(course))
    .catch(err => console.log("Error while adding a new Course " + err));
});

//TODO: a route to get courses of a particular domain
// @type     GET
// @route    /admin/course/:domain
// @desc     route to add a course of a particular domain
// @access   PRIVATE

router.get("/:domain", (req, res) => {
  Course.find({ domain: req.params.domain })
    .then(courses => {
      res.json(courses);
    })
    .catch(err =>
      console.log("Unable to find courses with the given domain " + err)
    );
});

//TODO: A route to delete a domain
// @type     DELETE
// @route    /admin/course/:domain
// @desc     route to delete a courses of a particular domain
// @access   PRIVATE
router.delete("/:domain", (req, res) => {
  Course.deleteMany({ domain: req.params.domain })
    .then(status => {
      res.json(status);
    })
    .catch(err => "Error while removing the domain");
});

// TODO: A route to delete a particular course of a domain
// @type     POST
// @route    /admin/course/:domain/:courseId
// @desc     route to delete a particular course of a particular domain
// @access   PRIVATE

router.delete("/:domain/:courseId", (req, res) => {
  Course.deleteOne(
    { domain: req.params.domain, _id: req.params.courseId } // TODO: this condition is not working
  )
    .then(status => {
      res.json(status);
    })
    .catch(err =>
      console.log("Error while deleting a particular course of a domain " + err)
    );
});

// TODO: A route to display all topics of a course
// @type     GET
// @route    /admin/course/topics/:domain/:courseId
// @desc     route to get topics of a particular course of a domain
// @access   PRIVATE
router.get("/topics/:domain/:courseId", (req, res) => {
  Course.find({ domain: req.params.domain, _id: req.params.courseId })
    .then(course => {
      res.json(course[0].topics); // TODO: undefined
    })
    .catch(err =>
      console.log("Error while finding the course to display the topics")
    );
});

//TODO: Adding topics to a course
// @type     POST
// @route    /admin/course/addTopic/:domain/:courseId
// @desc     route to add topic to a course
// @access   PRIVATE
router.post("/addTopic/:domain/:courseId", (req, res) => {
  Course.find({ domain: req.params.domain, _id: req.params.courseId })
    .then(course => {
      const newTopic = {
        topicName: req.body.topicName,
        topicDescription: req.body.topicDescription
      };
      console.log(course[0].courseName); // TODO: this is Working like an array ?
      course[0].topics.push(newTopic);
      course[0]
        .save()
        .then(course => res.json(course))
        .catch(err => console.log("Error while saving the topic to database"));
    })
    .catch(err =>
      console.log("Error while finding the course to add the topics " + err)
    );
});

//TODO: Delete a topic
// @type     POST
// @route    /admin/course/deleteTopic/:domain/:courseId/:topicId
// @desc     route to delete a topic from a course in a domain
// @access   PRIVATE
router.delete("/deleteTopic/:domain/:courseId/:topicId", (req, res) => {
  Course.find({ domain: req.params.domain, _id: req.params.courseId })
    .then(course => {
        let index = -1;
        // console.log(course[0].topics._id + " " + req.params.topicId);
      for (let i = 0; i < course[0].topics.length; i++) {
        if (course[0].topics[i]._id == req.params.topicId) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        console.log("Unable to find the topic to delete");
      } else {
        course[0].topics.splice(index, 1);
      }
      course[0]
        .save()
        .then(course => res.json(course))
        .catch(err =>
          console.log(
            "Error while saving the to database after deleting the topic " + err
          )
        );
    })
    .catch(err =>
      console.log("Error while finding the course to add the topics " + err)
    );
});
module.exports = router;
