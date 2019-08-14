const express = require("express");
const router = express.Router();

const Course = require("../../models/Course");


//TODO: a route to get courses of a particular domain
// @type     GET
// @route    /user/course/:domain
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
 
// TODO: A route to display all topics of a course
// @type     GET
// @route    /user/course/topics/:domain/:courseId
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
  

module.exports =  router;  