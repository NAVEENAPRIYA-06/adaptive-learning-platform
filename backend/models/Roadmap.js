const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  subject: {
    type: String
  },

  weeks: [
    {
      week: Number,
      topics: [String],
      tasks: [String]
    }
  ],

  progress: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Roadmap", RoadmapSchema);