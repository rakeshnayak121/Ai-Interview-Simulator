const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    resumeText: {
      type: String,
      required: true,
    },

    questions: [
      {
        type: String,
      },
    ],

    answers: [
      {
        question: String,
        answer: String,
        score: Number,
        feedback: String,
      },
    ],

    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);