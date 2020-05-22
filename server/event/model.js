const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  location: {
    type: String,
  },
  time: {
    type: String,
  },
  event_name: {
    type: String,
  },
  memo: {
    type: String
  },
  link: {
    type: String,
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
