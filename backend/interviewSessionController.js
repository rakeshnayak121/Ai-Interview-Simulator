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

module.exports = {
  createInterview,
};