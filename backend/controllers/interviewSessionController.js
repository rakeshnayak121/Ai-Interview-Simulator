const Interview = require("../models/Interview");

const createInterview = async (req, res) => {
  try {
    const { resumeText, questions } = req.body;

    const interview = await Interview.create({
      resumeText,
      questions,
    });

    res.status(201).json({
      success: true,
      interviewId: interview._id,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const saveAnswer = async (req, res) => {
  try {
    const {
      interviewId,
      question,
      answer,
      score,
      feedback,
    } = req.body;

    const interview = await Interview.findById(
      interviewId
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    interview.answers.push({
      question,
      answer,
      score,
      feedback,
    });

    interview.totalScore += score;

    await interview.save();

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(
      req.params.id
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createInterview,
  saveAnswer,
  getInterview,
};