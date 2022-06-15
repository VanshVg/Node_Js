const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  user_name: String,
  password: String,
  address: String,
  city: String,
  state: String,
  pinCode: Number,
  email: String,
  profile_pic: String,
});
module.exports = mongoose.model("datas", profileSchema);
