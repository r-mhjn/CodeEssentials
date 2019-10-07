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
    },
    challengePic:{
       type:String,
      //  required:true,  
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "myUser"
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        likes: [
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: "myUser"
            },
            date: {
              type: Date,
              default: Date.now
            }
          }
        ],
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },

  {
    timestamps: true
  }
);

module.exports = Challenge = mongoose.model("myChallenge", ChallengeSchema);
