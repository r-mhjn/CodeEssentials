const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    domain: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    courseImage:{
      type:String,
      required: true,
    },
    topics: [
      {
        topicName: {
          type: String,
          required: true
        },
        topicDescription: {
          type: String,
          required: true
        },
        addedOn: {
          type: Date,
          date: Date.now()
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Course = mongoose.model("myCourse", CourseSchema);

