import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function TestPage(){

const [subject,setSubject] = useState("")
const [difficulty,setDifficulty] = useState("beginner")
const [count,setCount] = useState(5)

const [questions,setQuestions] = useState([])
const [current,setCurrent] = useState(0)
const [answers,setAnswers] = useState({})
const [score,setScore] = useState(null)
const [perfect,setPerfect] = useState(false)

const generateTest = async()=>{

const cleanSubject = subject.trim()

if(!cleanSubject){
alert("Please enter a subject")
return
}

try{

const res = await API.post("/test/generate",{
subject: cleanSubject,
difficulty,
count
})

setQuestions(res.data.questions)
setCurrent(0)
setAnswers({})
setScore(null)
setPerfect(false)

}catch(err){
console.log(err)
}

}

const selectAnswer=(option)=>{
setAnswers({
...answers,
[current]:option
})
}

const nextQuestion=()=>{
if(current < questions.length-1){
setCurrent(current+1)
}
}

const prevQuestion=()=>{
if(current > 0){
setCurrent(current-1)
}
}

const submitTest = async()=>{

let correct=0

questions.forEach((q,i)=>{
if(answers[i]===q.answer){
correct++
}
})

setScore(correct)

const cleanSubject = subject.trim()

const percentage = Math.round((correct/questions.length)*100)

/* SAVE TEST HISTORY */

let history = JSON.parse(localStorage.getItem("testHistory")) || []

history.push({
subject: cleanSubject,
score: correct,
total: questions.length,
percentage: percentage,
date: new Date().toLocaleString()
})

localStorage.setItem("testHistory", JSON.stringify(history))

/* PERFECT SCORE CASE */

if(percentage === 100){
setPerfect(true)
return
}

try{

const res = await API.post("/roadmap/generate",{
questions,
answers,
subject: cleanSubject
})

const roadmapText = res.data?.roadmap

if(!roadmapText){
console.log("No roadmap returned from API")
return
}

/* LOAD EXISTING ROADMAPS */

let existing = JSON.parse(localStorage.getItem("roadmaps")) || []

const normalized = cleanSubject.toLowerCase()

/* CHECK IF SUBJECT EXISTS */

const index = existing.findIndex(
r => r.subject.toLowerCase() === normalized
)

const newRoadmap = {
subject: cleanSubject,
roadmap: roadmapText,
date: new Date().toLocaleString()
}

/* UPDATE OR ADD */

if(index !== -1){
existing[index] = newRoadmap
}else{
existing.push(newRoadmap)
}

/* SAVE */

localStorage.setItem("roadmaps", JSON.stringify(existing))

}catch(err){
console.log(err)
}

}

const percentage = score !== null ? Math.round((score/questions.length)*100) : 0

return(

<Layout>

<h2 className="text-3xl font-bold mb-8">
AI Diagnostic Test
</h2>

{/* TEST SETUP */}

{questions.length===0 &&(

<div className="bg-white p-10 rounded-2xl shadow-lg w-full">

<h3 className="text-xl font-semibold mb-8">
Create Your AI Diagnostic Test
</h3>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div>
<label className="text-sm text-gray-600 mb-2 block">
Subject
</label>

<input
className="border p-3 rounded w-full"
placeholder="Java, Python, Machine Learning..."
value={subject}
onChange={(e)=>setSubject(e.target.value)}
/>
</div>

<div>
<label className="text-sm text-gray-600 mb-2 block">
Difficulty Level
</label>

<select
className="border p-3 rounded w-full"
value={difficulty}
onChange={(e)=>setDifficulty(e.target.value)}
>

<option value="beginner">Beginner</option>
<option value="intermediate">Intermediate</option>
<option value="advanced">Advanced</option>

</select>
</div>

<div>
<label className="text-sm text-gray-600 mb-2 block">
Number of Questions
</label>

<input
className="border p-3 rounded w-full"
type="number"
value={count}
onChange={(e)=>setCount(e.target.value)}
/>
</div>

</div>

<button
className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg"
onClick={generateTest}
>
Start AI Diagnostic Test
</button>

</div>

)}

{/* QUESTION UI */}

{questions.length>0 && score===null &&(

<div className="bg-white p-10 rounded-2xl shadow-lg w-full">

<p className="text-sm text-gray-500 mb-2">
Question {current+1} of {questions.length}
</p>

<div className="w-full bg-gray-200 h-2 rounded mb-6">
<div
className="bg-green-500 h-2 rounded"
style={{width:`${((current+1)/questions.length)*100}%`}}
/>
</div>

<p className="mb-6 text-xl font-medium">
{questions[current]?.question}
</p>

<div className="space-y-4">

{questions[current]?.options.map((opt,i)=>(

<div
key={i}
onClick={()=>selectAnswer(opt)}
className={`w-full p-4 border rounded-xl cursor-pointer transition

${answers[current]===opt
? "bg-green-100 border-green-500"
: "hover:bg-gray-100"}

`}
>

{opt}

</div>

))}

</div>

<div className="flex justify-between mt-8">

<button
className="bg-gray-300 px-5 py-2 rounded"
onClick={prevQuestion}
>
Previous
</button>

{current < questions.length-1 ?(

<button
className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
onClick={nextQuestion}
>
Next
</button>

):( 

<button
className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
onClick={submitTest}
>
Submit Test
</button>

)}

</div>

</div>

)}

{/* RESULT UI */}

{score!==null &&(

<div className="bg-white p-10 rounded-2xl shadow-lg w-full">

<h3 className="text-2xl font-bold mb-6">
Your Test Result
</h3>

<div className="flex items-center justify-between mb-6">

<div>

<p className="text-gray-500">
Score
</p>

<p className="text-6xl font-bold text-green-500">
{score} / {questions.length}
</p>

</div>

<div className="text-right">

<p className="text-gray-500 mb-2">
Performance
</p>

<p className="text-xl font-semibold">

{percentage >= 80 && "Excellent 🚀"}
{percentage >= 50 && percentage <80 && "Good 👍"}
{percentage <50 && "Needs Improvement 📚"}

</p>

</div>

</div>

<div className="w-full bg-gray-200 h-4 rounded mb-6">
<div
className="bg-green-500 h-4 rounded"
style={{width:`${percentage}%`}}
/>
</div>

{perfect ? (

<div className="bg-green-100 border border-green-300 text-green-700 p-6 rounded-lg text-center font-semibold">
🎉 Perfect Score! You already mastered this topic.
</div>

) : (

<div className="flex gap-4">

<button
className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
onClick={()=>window.location.href="/roadmap"}
>
View Learning Roadmap
</button>

<button
className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
onClick={()=>{
setQuestions([])
setScore(null)
setAnswers({})
setCurrent(0)
}}
>
Retake Test
</button>

</div>

)}

</div>

)}

</Layout>

)

}