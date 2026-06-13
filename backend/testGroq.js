require("dotenv").config();

const groq = require("./config/groq");

async function test() {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: "Say Hello Rakesh",
        },
      ],
    });

    console.log(
      response.choices[0].message.content
    );
  } catch (error) {
    console.error(error);
  }
}

test();