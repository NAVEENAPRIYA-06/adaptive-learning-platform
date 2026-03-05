import { useEffect, useState } from "react"
import Layout from "../components/Layout"

export default function RoadmapPage(){

const [roadmaps,setRoadmaps] = useState([])
const [openIndex,setOpenIndex] = useState(null)

useEffect(()=>{

let stored = JSON.parse(localStorage.getItem("roadmaps")) || []

/* REMOVE INVALID OR PERFECT SCORE ROADMAPS */

stored = stored.filter(r => 
r.roadmap &&
r.roadmap !== "PERFECT_SCORE"
)

setRoadmaps(stored)

},[])


const parseRoadmap=(text)=>{

if(!text) return {weeks:[],weak:[]}

const lines = text.split("\n")

let weeks=[]
let weak=[]

lines.forEach(line=>{

const l=line.trim()

/* WEAK TOPICS */

if(l.startsWith("-")){
weak.push(l.replace("- ",""))
}

/* WEEK PLAN */

if(l.toLowerCase().startsWith("week")){
weeks.push(l)
}

})

return {weeks,weak}

}


return(

<Layout>

<h2 className="text-3xl font-bold mb-8">
AI Learning Roadmaps
</h2>


{roadmaps.length===0 &&(

<div className="bg-white p-6 rounded-xl shadow">
No roadmap available. Take a diagnostic test first.
</div>

)}


<div className="space-y-6">

{roadmaps.map((item,index)=>{

const {weeks,weak}=parseRoadmap(item.roadmap)

return(

<div 
key={index} 
className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
>

{/* HEADER */}

<div
className="p-6 flex justify-between items-center cursor-pointer"
onClick={()=>setOpenIndex(openIndex===index?null:index)}
>

<div>

<h3 className="text-xl font-bold text-gray-800">
📚 {item.subject}
</h3>

<p className="text-sm text-gray-500 mt-1">
Weak topics: {weak.length}
</p>

</div>

<button className="text-green-600 font-semibold hover:text-green-700">

{openIndex===index ? "Hide Roadmap" : "View Roadmap"}

</button>

</div>


{/* EXPANDED ROADMAP */}

{openIndex===index &&(

<div className="border-t px-6 pb-6 space-y-6">

{/* WEAK TOPICS */}

<div>

<h4 className="font-semibold text-lg mb-3">
⚠ Weak Topics
</h4>

<div className="flex flex-wrap gap-3">

{weak.length===0 ? (

<div className="text-gray-500 text-sm">
No weak topics detected.
</div>

) : (

weak.map((topic,i)=>(

<div
key={i}
className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium"
>
{topic}
</div>

))

)}

</div>

</div>


{/* LEARNING PLAN */}

<div>

<h4 className="font-semibold text-lg mb-4">
📅 Learning Plan
</h4>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

{weeks.map((w,i)=>{

const parts = w.split(":")

return(

<div
key={i}
className="bg-gray-50 border rounded-xl p-5 hover:shadow-md transition"
>

<h5 className="font-bold text-green-600 mb-2">
{parts[0]}
</h5>

<p className="text-gray-600 mb-4">
{parts.slice(1).join(":")}
</p>

{/* RESOURCE BUTTONS */}

<div className="flex gap-3 flex-wrap">

<button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
🎥 Video
</button>

<button className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200">
📘 Docs
</button>

<button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
💻 Practice
</button>

</div>

</div>

)

})}

</div>

</div>

</div>

)}

</div>

)

})}

</div>

</Layout>

)

}