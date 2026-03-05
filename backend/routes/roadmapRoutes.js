const express = require("express")
const router = express.Router()
const generateRoadmap = require("../ai/roadmapGenerator")

router.post("/generate", async (req,res)=>{

try{

const {questions,answers,subject} = req.body

if(!questions || !answers || !subject){
return res.status(400).json({error:"Invalid request data"})
}

/* Detect weak topics */

let weakTopics=[]

questions.forEach((q,i)=>{

if(answers[i] !== q.answer){

/* Extract topic from question text */
weakTopics.push(q.question)

}

})

/* If everything correct */

if(weakTopics.length === 0){

weakTopics.push("Advanced concepts in " + subject)

}

/* Generate roadmap */

const roadmap = await generateRoadmap(subject, weakTopics)

if(!roadmap){
return res.status(500).json({error:"AI returned empty roadmap"})
}

res.json({
roadmap: roadmap
})

}catch(err){

console.error("Roadmap route error:",err)

res.status(500).json({
error:"Roadmap generation failed"
})

}

})

module.exports = router