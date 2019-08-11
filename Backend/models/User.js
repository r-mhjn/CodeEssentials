const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// TODO: gonna have to add the question id to the user ...to give out the courses by the user
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mycourses: [
      {
        courseId: {
          type: String,
          required: true
        },
        courseName: {
          type: String,
          required: true
        },
        adddedOn: {
          type: Date,
          date: Date.now()
        },
        completedOn: {
          type: Date
        }
      }
    ],
    password: {
      type: String,
      required: true
    },
    phoneno: {
      type: String,
      required: true,
      maxLength: 12
    },
    profilepic: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/01/11/89/61/500_F_111896141_yGxg122F73hHRuhJWtIq7i2VjP36vW6j.jpg"
    }
  },
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model("myUser", UserSchema);
