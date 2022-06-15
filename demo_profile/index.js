const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/profile");
const route = require("./routes/route");
app.use(express.json());
app.use("/api", route);
app.use("/uploads", express.static("profile_pic"));
app.listen(4000, () => {
  console.log("Server listening at 4000");
});
