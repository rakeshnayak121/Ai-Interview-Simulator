
const groq = require("../config/groq");

const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

   const prompt = `
You are a senior technical interviewer.

Evaluate every answer.

Return ONLY JSON.

{
  "overallScore":0,
  "communication":0,
  "technicalSkills":0,
  "confidence":0,
  "strengths":[],
  "weaknesses":[],
  "feedback":""
}

Questions and Answers:

${JSON.stringify(answers,null,2)}

Scoring Rules:

- Empty answer = 0
- Weak answer = 1-4
- Average answer = 5-7
- Good answer = 8-9
- Excellent answer = 10

Be strict.
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
      evaluation:
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
  evaluateAnswer,
};
