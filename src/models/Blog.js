const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const blogSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  author: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
