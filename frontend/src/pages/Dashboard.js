import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function DashboardPage(){

const [history,setHistory] = useState([])
const [roadmaps,setRoadmaps] = useState([])

const [xp,setXp] = useState(0)
const [streak,setStreak] = useState(0)

useEffect(()=>{

const testHistory = JSON.parse(localStorage.getItem("testHistory")) || []
const roadmapData = JSON.parse(localStorage.getItem("roadmaps")) || []

setHistory(testHistory)
setRoadmaps(roadmapData)

/* LOAD XP */

const xpPoints = Number(localStorage.getItem("xp")) || 0
setXp(xpPoints)

/* LOAD STREAK */

const streakData = JSON.parse(localStorage.getItem("streak")) || {count:0}
setStreak(streakData.count)

},[])

/* STATS */

const totalTests = history.length

const averageScore = history.length
? Math.round(history.reduce((s,h)=>s+h.percentage,0)/history.length)
: 0

const bestScore = history.length
? Math.max(...history.map(h=>h.percentage))
: 0

/* COUNT WEAK TOPICS */

const weakTopics = roadmaps.reduce((count,r)=>{

const lines = r.roadmap?.split("\n") || []

return count + lines.filter(l=>l.startsWith("-")).length

},0)


/* AI RECOMMENDED TOPICS */

const recommendedTopics = []

roadmaps.forEach(r => {

const lines = r.roadmap?.split("\n") || []

lines.forEach(line => {

if(line.startsWith("-")){
recommendedTopics.push(line.replace("- ",""))
}

})

})

const uniqueRecommendations = [...new Set(recommendedTopics)].slice(0,5)


/* DAILY AI STUDY PLAN */

let studyPlan = uniqueRecommendations.slice(0,3).map((topic,i)=>({
topic,
time: i===0 ? "30 mins" : i===1 ? "40 mins" : "20 mins"
}))

studyPlan.push({
topic:"Practice Quiz",
time:"10 mins"
})


/* SKILL LEVEL */

let skill="Beginner"

if(averageScore>=80) skill="Advanced 🚀"
else if(averageScore>=60) skill="Intermediate 👍"

/* XP LEVEL SYSTEM */

let level = 1

if(xp > 1000) level = 5
else if(xp > 600) level = 4
else if(xp > 300) level = 3
else if(xp > 150) level = 2

/* CHART DATA */

const progressData = history.map((test,i)=>({
name:`Test ${i+1}`,
score:test.percentage
}))

return(

<Layout>

{/* HERO HEADER */}

<div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow mb-10">

<h1 className="text-3xl font-bold mb-2">
Welcome Back 👋
</h1>

<p className="opacity-90">
Continue improving your AI skills today.
</p>

</div>


{/* STAT CARDS */}

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">Tests Taken</p>
<p className="text-3xl font-bold text-green-600 mt-2">{totalTests}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">Average Score</p>
<p className="text-3xl font-bold text-green-600 mt-2">{averageScore}%</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">Best Score</p>
<p className="text-3xl font-bold text-green-600 mt-2">{bestScore}%</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">Weak Topics</p>
<p className="text-3xl font-bold text-red-500 mt-2">{weakTopics}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">XP Points</p>
<p className="text-3xl font-bold text-emerald-600 mt-2">{xp}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">Learning Streak</p>
<p className="text-3xl font-bold text-orange-500 mt-2">🔥 {streak}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<p className="text-gray-500 text-sm">Learner Level</p>
<p className="text-3xl font-bold text-purple-600 mt-2">⭐ {level}</p>
</div>

</div>


{/* MAIN GRID */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

{/* PROGRESS CHART */}

<div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">

<h3 className="text-xl font-semibold mb-6">
Learning Progress
</h3>

{history.length===0 ?(

<p className="text-gray-500">
Take a diagnostic test to begin learning.
</p>

):( 

<ResponsiveContainer width="100%" height={260}>

<LineChart data={progressData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis domain={[0,100]}/>

<Tooltip/>

<Line
type="monotone"
dataKey="score"
stroke="#16a34a"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

)}

</div>


{/* LEARNING INSIGHTS */}

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="text-xl font-semibold mb-6">
Learning Insights
</h3>

<div className="space-y-6">

<div>
<p className="text-gray-500 text-sm">Skill Level</p>
<p className="text-xl font-bold">{skill}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Courses Learning</p>
<p className="text-xl font-bold">{roadmaps.length}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Average Score</p>
<p className="text-xl font-bold text-green-600">{averageScore}%</p>
</div>

<div>
<p className="text-gray-500 text-sm">XP Earned</p>
<p className="text-xl font-bold text-emerald-600">{xp}</p>
</div>

</div>

</div>

</div>


{/* COURSES */}

<div className="bg-white p-6 rounded-xl shadow mb-10">

<h3 className="text-xl font-semibold mb-6">
Your Courses
</h3>

{roadmaps.length===0 ?(

<p className="text-gray-500">
No courses started yet
</p>

):( 

<div className="grid md:grid-cols-3 gap-6">

{roadmaps.map((course,i)=>(

<div
key={i}
className="border rounded-xl p-5 hover:shadow-lg transition"
>

<p className="font-semibold mb-3">
📚 {course.subject}
</p>

<div className="w-full bg-gray-200 h-2 rounded mb-2">

<div
className="bg-green-500 h-2 rounded"
style={{width:`${Math.min(averageScore,100)}%`}}
/>

</div>

<p className="text-sm text-gray-500">
Learning in progress
</p>

</div>

))}

</div>

)}

</div>


{/* AI RECOMMENDATIONS */}

<div className="bg-white p-6 rounded-xl shadow mb-10">

<h3 className="text-xl font-semibold mb-6">
🤖 AI Recommended Next Topics
</h3>

{uniqueRecommendations.length === 0 ?(

<p className="text-gray-500">
Take more diagnostic tests to receive AI recommendations.
</p>

):( 

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

{uniqueRecommendations.map((topic,i)=>(

<div
key={i}
className="border border-green-200 bg-green-50 p-4 rounded-lg hover:shadow transition"
>

<p className="font-medium text-green-700">
{topic}
</p>

</div>

))}

</div>

)}

</div>


{/* DAILY STUDY PLAN */}

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="text-xl font-semibold mb-6">
🧠 Today's AI Study Plan
</h3>

{studyPlan.length === 0 ?(

<p className="text-gray-500">
Take diagnostic tests to generate a personalized study plan.
</p>

):( 

<div className="space-y-4">

{studyPlan.map((item,i)=>(

<div
key={i}
className="flex justify-between items-center border p-4 rounded-lg hover:shadow transition"
>

<div className="font-medium text-gray-700">
{i+1}. {item.topic}
</div>

<div className="text-sm text-green-600 font-semibold">
{item.time}
</div>

</div>

))}

</div>

)}

</div>

</Layout>

)

}