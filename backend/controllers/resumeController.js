
const fs = require("fs");
const pdfParse = require("pdf-parse");
const groq = require("../config/groq");

const uploadResume = async (req, res) => {
  console.log("UPLOAD RESUME API HIT");

  try { pdfBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(pdfBuffer);

    const prompt = `
You are an expert resume reviewer.

Analyze the resume below.

Extract:

1. Full Name
2. Email
3. Phone Number
4. GitHub Profile
5. LinkedIn Profile
6. Most Suitable Job Role

Then evaluate:

1. Resume Score out of 100
2. Strengths
3. Weaknesses
4. Suggestions for Improvement
5. 10 Interview Questions

Return ONLY valid JSON.

{
"name": "",
  "email": "",
  "phone": "",
  "github": "",
  "linkedin": "",
  "role": "",
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "questions": []
}
Generate exactly 10 interview questions based on skills,
projects, internships and technologies found in the resume.
Resume:

${data.text}
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

    console.log(
      "========== AI RESPONSE =========="
    );

    console.log(aiResponse);

    console.log(
      "================================="
    );

    let result;

    try {
      const jsonMatch =
        aiResponse.match(/\{[\s\S]*\}/);

      console.log("JSON MATCH:");

      console.log(jsonMatch);

      result = JSON.parse(
        jsonMatch[0]
      );
    } catch (err) {
      console.log(
        "JSON PARSE ERROR"
      );

      console.log(err);

      return res.status(500).json({
        success: false,
        error:
          "AI returned invalid JSON",
      });
    }

    res.json({
      success: true,
      resumeText: data.text,
      analysis: result,
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
  uploadResume,
};