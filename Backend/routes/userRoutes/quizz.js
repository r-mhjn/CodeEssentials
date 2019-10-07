const express = require('express');
const router = express.Router();

//Importing schemas
const Quizz = require('../../models/Quizz');

// @type      GET
// @route    /user/quizz/
// @desc     route to get all quizz topics
// @access   Private

router.get('/', (req, res) => {
	Quizz.find()
		.then(topics => {
			res.json(topics);
		})
		.catch(err => console.log('Error while finding all quizz topics ' + err));
});

module.exports = router;
