import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer,
BarChart,
Bar
} from "recharts"

export default function AnalyticsPage(){

const [history,setHistory] = useState([])

useEffect(()=>{

const stored = JSON.parse(localStorage.getItem("testHistory")) || []
setHistory(stored)

},[])

/* CALCULATIONS */

const totalTests = history.length

const bestScore = history.length
? Math.max(...history.map(h=>h.percentage))
: 0

const averageScore = history.length
? Math.round(
history.reduce((sum,h)=>sum+h.percentage,0) / history.length
)
: 0

/* SUBJECT PERFORMANCE */

const subjectScores = {}

history.forEach(test=>{

if(!subjectScores[test.subject]){
subjectScores[test.subject] = []
}

subjectScores[test.subject].push(test.percentage)

})

const subjectData = Object.keys(subjectScores).map(subject=>{

const avg = Math.round(
subjectScores[subject].reduce((a,b)=>a+b,0) /
subjectScores[subject].length
)

return {
subject,
score: avg
}

})

/* LINE CHART DATA */

const progressData = history.map((test,i)=>({

name: `Test ${i+1}`,
score: test.percentage

}))

return(

<Layout>

<h2 className="text-3xl font-bold mb-8">
Learning Analytics
</h2>

{/* STATS */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500 text-sm">
Total Tests
</p>

<p className="text-3xl font-bold mt-2">
{totalTests}
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500 text-sm">
Average Score
</p>

<p className="text-3xl font-bold mt-2 text-blue-600">
{averageScore}%
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500 text-sm">
Best Score
</p>

<p className="text-3xl font-bold mt-2 text-green-600">
{bestScore}%
</p>

</div>

</div>

{/* PROGRESS CHART */}

<div className="bg-white p-6 rounded-xl shadow mb-10">

<h3 className="text-xl font-semibold mb-6">
Score Progress
</h3>

{history.length===0 ?(

<p className="text-gray-500">
No tests taken yet
</p>

):(

<ResponsiveContainer width="100%" height={300}>

<LineChart data={progressData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="name" />

<YAxis domain={[0,100]} />

<Tooltip />

<Line
type="monotone"
dataKey="score"
stroke="#22c55e"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

)}

</div>

{/* SUBJECT PERFORMANCE */}

<div className="bg-white p-6 rounded-xl shadow mb-10">

<h3 className="text-xl font-semibold mb-6">
Subject Performance
</h3>

{subjectData.length===0 ?(

<p className="text-gray-500">
No subject data yet
</p>

):(

<ResponsiveContainer width="100%" height={300}>

<BarChart data={subjectData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="subject" />

<YAxis domain={[0,100]} />

<Tooltip />

<Bar dataKey="score" fill="#3b82f6" />

</BarChart>

</ResponsiveContainer>

)}

</div>

{/* TEST HISTORY */}

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="text-xl font-semibold mb-6">
Recent Test History
</h3>

{history.length===0 &&(

<p className="text-gray-500">
No tests taken yet.
</p>

)}

<div className="space-y-4">

{history.slice().reverse().map((test,i)=>(

<div
key={i}
className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
>

<div>

<p className="font-semibold">
{test.subject}
</p>

<p className="text-sm text-gray-500">
{test.date}
</p>

</div>

<div className="text-right">

<p className="font-bold">
{test.score} / {test.total}
</p>

<p className="text-sm text-gray-500">
{test.percentage}%
</p>

</div>

</div>

))}

</div>

</div>

</Layout>

)

}