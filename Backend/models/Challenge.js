const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    challengeStatement: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Challenge = mongoose.model("myChallenge", ChallengeSchema);
