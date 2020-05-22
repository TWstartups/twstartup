const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
  og_title: {
    type: String,
  },
  og_description: {
    type: String,
  },
  og_image: {
    type: String,
  },
  note: {
    type: String
  },
  link: {
    type: String,
  }
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
