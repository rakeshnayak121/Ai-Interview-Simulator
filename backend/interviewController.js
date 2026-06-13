const groq = require("../config/groq");

const generateQuestions = async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
    You are an interviewer.

    Based on this resume, generate 10 interview questions.

    Resume:
    ${resumeText}
    `;

    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      success: true,
      questions:
        response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateQuestions,
};