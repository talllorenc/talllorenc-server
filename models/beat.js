const { Schema, model } = require("mongoose");

const beatSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  bpm: {
    type: String,
    require: true,
  },
  photoUrl: {
    type: String,
    default: "",
  },
  audio: {
    type: String,
    default: "",
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Beat", beatSchema);
