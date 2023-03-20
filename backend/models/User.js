const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
});

module.exports = mongoose.model("User", UserSchema);
