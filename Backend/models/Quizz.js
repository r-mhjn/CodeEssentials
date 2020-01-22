const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzSchema = new Schema(
  {
    topicName: {
      type: String,
      required: true
    },
    quizImage: {
      type: String,
      required: true
    },
    questions: [
      {
        options: [],
        answer: {
          type: Number,
          required: true
        },
        questionStatement: {
          type: String,
          required: true
        },
        explanation: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Quizz = mongoose.model("myQuizz", QuizzSchema);
