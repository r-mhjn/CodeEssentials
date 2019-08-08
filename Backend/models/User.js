const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,      
    },
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
