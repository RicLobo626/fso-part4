const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
