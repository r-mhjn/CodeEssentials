const express = require('express');
const router = express.Router();

// Importing schemas
const Quizz = require('../../models/Quizz');

// @type      GET
// @route    /admin/quizz/
// @desc     route to get all quizz topics
// @access   Private

router.get('/', (req, res) => {
	Quizz.find()
		.then(topics => {
			res.json(topics);
		})
		.catch(err => console.log('Error while finding all quizz topics ' + err));
});

// @type     POST
// @route    /admin/quizz/createtopic
// @desc     route to create topic for quizz
// @access   Private

router.post('/createtopic', (req, res) => {
	const newQuizz = new Quizz({
		topicName: req.body.topicName,
	});
	newQuizz
		.save()
		.then(quizz => {
			res.json(quizz);
		})
		.catch(err => console.log('Error while saving new quizz topic to database' + err));
});

// @type     Delete
// @route    /admin/quizz/:topicName
// @desc     route to delete a topic
// @access   Private

router.delete('/:topicName', (req, res) => {
	Quizz.findOneAndDelete({ topicName: req.params.topicName })
		.then(topic => {
			res.json(topic);
		})
		.catch(err => console.log('Error while finding and deleting quizz topic ' + err));
});

// @type     POST
// @route    /admin/quizz/addquestion/:topicName
// @desc     route to add questions to a particular topic
// @access   Private

router.post('/addquestion/:topicName', (req, res) => {
	Quizz.findOne({ topicName: req.params.topicName })
		.then(topic => {
			// res.json(topic);
			for (let i = 0; i < req.body.questions.length; i++) {
				const newQuestion = {
					options: [],
					answer: req.body.questions[i].answer,
					explanation: req.body.questions[i].explanation,
					questionStatement: req.body.questions[i].questionStatement,
				};
				for (let j = 0; j < req.body.questions[i].options.length; j++) {
					newQuestion.options.push(req.body.questions[i].options[j]);
					// console.log(newQuestion.options[j].length);
				}
				topic.questions.push(newQuestion);
			}
			topic
				.save()
				.then(questions => {
					res.json(questions);
				})
				.catch(err => console.log('Error while saving the questions to the database ' + err));
		})
		.catch(err => console.log('Error while finding a topic ' + err));
});

// @type     DELETE
// @route    /admin/quizz/:topicName/:questionid
// @desc     route to delete a question from a topic
// @access   Private

router.delete('/:topicName/:questionid', (req, res) => {
	Quizz.findOne({ topicName: req.params.topicName })
		.then(topic => {
			let index;
			for (let i = 0; i < topic.questions.length; i++) {
				if (topic.questions[i]._id == req.params.questionid) {
					index = i;
					break;
				}
			}
			topic.questions.splice(index, 1);
			topic
				.save()
				.then(topic => {
					res.json(topic);
				})
				.catch(err => console.log('Error while saving the topic to database after question deletion ' + err));
		})
		.catch(err => console.log('Error while finding the topic to delete a question ' + err));
});

// @type     PUT
// @route    /admin/quizz/:topicname/:questionid
// @desc     route to update/edit a question of a topic
// @access   Private  .. send a single object from front end (remeber while making one);

router.put('/:topicName/:questionid', (req, res) => {
	Quizz.findOne({ topicName: req.params.topicName })
		.then(topic => {
			let index;
			for (let i = 0; i < topic.questions.length; i++) {
				if (topic.questions[i]._id == req.params.questionid) {
					index = i;
					break;
				}
			}
			topic.questions[index].answer = req.body.question.answer;
			topic.questions[index].questionStatement = req.body.question.questionStatement;
			topic.questions[index].explanation = req.body.question.explanation;
			for (let i = 0; i < req.body.question.options.length; i++) {
				topic.questions[index].options[i] = req.body.question.options[i];
			}
			topic
				.save()
				.then(topic => {
					res.json(topic);
				})
				.catch(err =>
					console.log('Error while saving the topic to database after updating the question ' + err)
				);
		})
		.catch(err => console.log('Error while finding quizz topic to update/edit a question'));
});

module.exports = router;
