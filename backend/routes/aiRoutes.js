const express = require("express")
const router = express.Router()
const OpenAI = require("openai")

const openai = new OpenAI({
baseURL:"https://openrouter.ai/api/v1",
apiKey:process.env.OPENROUTER_API_KEY
})

router.post("/chat", async(req,res)=>{

try{

const {message} = req.body

const completion = await openai.chat.completions.create({

model:"openai/gpt-3.5-turbo",

messages:[
{
role:"system",
content:"You are a helpful AI tutor that teaches programming, AI, and computer science."
},
{
role:"user",
content:message
}
]

})

res.json({
reply:completion.choices[0].message.content
})

}catch(err){

console.log(err)

res.status(500).json({
error:"AI chat failed"
})

}

})

module.exports = router