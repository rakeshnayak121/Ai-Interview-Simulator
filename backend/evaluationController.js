const groq = require("../config/groq");

const evaluateAnswer = async (req, res) => {
  try {
    const { answers } = req.body;

    console.log("========== RECEIVED ANSWERS ==========");
    console.log(JSON.stringify(answers, null, 2));

    const prompt = `
You are an expert technical interviewer.

Evaluate the interview answers below.

Return ONLY valid JSON.

{
  "overallScore": 85,
  "communication": 80,
  "technicalSkills": 85,
  "confidence": 90,
  "strengths": [
    "Strong communication"
  ],
  "weaknesses": [
    "Needs deeper technical explanations"
  ],
  "feedback": "Good performance overall."
}

Interview Answers:
${JSON.stringify(answers, null, 2)}
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

    const aiResponse =
      response.choices[0].message.content;

    console.log("========== AI RESPONSE ==========");
    console.log(aiResponse);

    let result;

    try {
      const jsonMatch =
        aiResponse.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("No JSON Found");
      }

      result = JSON.parse(jsonMatch[0]);

      console.log("========== PARSED RESULT ==========");
      console.log(result);
    } catch (err) {
      console.log("JSON Parse Failed");

      result = {
        overallScore: 0,
        communication: 0,
        technicalSkills: 0,
        confidence: 0,
        strengths: [],
        weaknesses: [],
        feedback: "AI response parsing failed",
      };
    }

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  evaluateAnswer,
};