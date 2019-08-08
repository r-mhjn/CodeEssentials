const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "myUser"
    },
    question: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    upvotes: [
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

module.exports = Question = mongoose.model("myQuestion", QuestionSchema);
