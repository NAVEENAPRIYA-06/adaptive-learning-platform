const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

async function generateQuestions(subject, level, count) {
  try {

    const prompt = `
Generate ${count} multiple choice questions for ${level} level students studying ${subject}.

Return ONLY JSON in this format:

[
{
"question":"Question text",
"options":["A","B","C","D"],
"answer":"Correct option"
}
]
`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You generate quiz questions." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    let text = completion.choices[0].message.content;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const questions = JSON.parse(text);

    return questions;

  } catch (error) {
    console.error("AI generation failed:", error);
    throw new Error("AI question generation failed");
  }
}

module.exports = generateQuestions;