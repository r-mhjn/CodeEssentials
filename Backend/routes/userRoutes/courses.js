const express = require('express');
const router = express.Router();

const Course = require('../../models/Course');
const User = require('../../models/User');

// @type     GET
// @route    /user/course/mycourses
// @desc     route to get courses added by the user
// @access   PRIVATE
router.get('/mycourses', (req, res) => {
	console.log(req.user._id);
	// res.json({ id: res.user._id });
	console.log('hey');
	User.findById(req.user._id)
		.then(user => {
			res.json(user.mycourses);
		})
		.catch(err => console.log('Error finding user while fetching user courses ' + err));
});

// @type     POST
// @route    /user/course/
// @desc     route to get all courses
// @access   PRIVATE

router.get('/', (req, res) => {
	Course.find()
		.then(courses => {
			res.json(courses);
		})
		.catch(err => console.log('Error while fetching all the courses ' + err));
});

//TODO: a route to get courses of a particular domain
// @type     GET
// @route    /user/course/:domain
// @desc     route to get courses of a particular domain
// @access   PRIVATE

router.get('/:domain', (req, res) => {
	Course.find({ domain: req.params.domain })
		.then(courses => {
			res.json(courses);
		})
		.catch(err => console.log('Unable to find courses with the given domain ' + err));
});

// TODO: A route to display all topics of a course
// @type     GET
// @route    /user/course/topics/:domain/:courseId
// @desc     route to get topics of a particular course of a domain
// @access   PRIVATE
router.get('/topics/:domain/:courseId', (req, res) => {
	Course.find({ domain: req.params.domain, _id: req.params.courseId })
		.then(course => {
			res.json(course[0].topics); // TODO: undefined
		})
		.catch(err => console.log('Error while finding the course to display the topics'));
});

// @type     POST
// @route    /user/course/addtousercourse
// @desc     route to add user course    //TODO: if course is already added don't add again
// @access   PRIVATE

router.post('/addtousercourse', (req, res) => {
	User.findById(req.user._id)
		.then(user => {
			let newCourse = {
				courseId: req.body.courseId,
				courseName: req.body.courseName,
			};
			let courseFound = false;
			for (let i = 0; i < user.mycourses.length; i++) {
				if (user.mycourses[i].courseId == newCourse.courseId) {
					courseFound = true;
				}
			}

			// res.json(user);
			if (courseFound == false) {
				user.mycourses.push(newCourse);
				user.save()
					.then(course => {
						res.json(course);
					})
					.catch('Error saving user courses' + err);
			} else {
				res.json({ courseFound: 'course is already added' });
			}
		})
		.catch(err => console.log('Error finding user while fetching user courses ' + err));
});

module.exports = router;
