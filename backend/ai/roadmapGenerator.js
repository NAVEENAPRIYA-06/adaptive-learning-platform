const OpenAI = require("openai")

const openai = new OpenAI({
baseURL: "https://openrouter.ai/api/v1",
apiKey: process.env.OPENROUTER_API_KEY
})

async function generateRoadmap(subject, weakTopics){

try{

const prompt = `
Create a 4 week learning roadmap for ${subject}.

The student is weak in:
${weakTopics.join(", ")}

Follow EXACTLY this structure:

Weak Topics:
- topic1
- topic2

Learning Roadmap:

Week 1: topic explanation

Week 2: topic explanation

Week 3: topic explanation

Week 4: topic explanation
`

const completion = await openai.chat.completions.create({
model: "openai/gpt-3.5-turbo",
messages:[
{ role:"system", content:"You generate structured learning roadmaps."},
{ role:"user", content: prompt}
],
temperature:0.6
})

let text = completion.choices[0].message.content

text = text.replace(/```/g,"").trim()

return text

}catch(error){

console.error("AI roadmap generation failed:",error)
return null

}

}

module.exports = generateRoadmap