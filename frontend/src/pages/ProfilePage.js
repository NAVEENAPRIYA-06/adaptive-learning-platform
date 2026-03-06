import { useEffect, useState } from "react"
import Layout from "../components/Layout"

export default function ProfilePage(){

const [name,setName] = useState("Student")
const [email,setEmail] = useState("[student@eduai.com](mailto:student@eduai.com)")
const [level,setLevel] = useState("Beginner")
const [memberSince,setMemberSince] = useState("2026")

const [achievements,setAchievements] = useState([])

useEffect(()=>{

const history = JSON.parse(localStorage.getItem("testHistory")) || []

let badges = []

if(history.length >= 1){
badges.push("🏅 First Diagnostic Test Completed")
}

if(history.some(h => h.percentage >= 80)){
badges.push("🚀 High Performer (80%+ Score)")
}

if(history.length >= 5){
badges.push("🧠 Dedicated Learner")
}

const streak = JSON.parse(localStorage.getItem("streak")) || {count:0}

if(streak.count >= 3){
badges.push("🔥 Learning Streak Champion")
}

setAchievements(badges)

},[])

const resetProgress = () => {

if(window.confirm("Reset all learning data?")){

localStorage.removeItem("testHistory")
localStorage.removeItem("roadmaps")
localStorage.removeItem("xp")
localStorage.removeItem("streak")

alert("Learning progress reset")

window.location.reload()

}

}

return(

<Layout>

<h2 className="text-3xl font-bold mb-8">
Student Profile
</h2>

{/* PROFILE HEADER */}

<div className="bg-white rounded-xl shadow p-8 flex items-center gap-6 mb-8">

<div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
{name[0]}
</div>

<div>

<h3 className="text-xl font-semibold">
{name}
</h3>

<p className="text-gray-500">
{email}
</p>

<p className="text-sm text-gray-400 mt-1">
Member since {memberSince}
</p>

</div>

</div>

{/* LEARNING IDENTITY */}

<div className="bg-white rounded-xl shadow p-8 mb-8">

<h3 className="text-xl font-semibold mb-6">
Learning Identity
</h3>

<div className="grid md:grid-cols-3 gap-6">

<div>

<p className="text-gray-500 text-sm">
Skill Level
</p>

<p className="text-lg font-semibold">
{level}
</p>

</div>

<div>

<p className="text-gray-500 text-sm">
Learning Style
</p>

<p className="text-lg font-semibold">
Practice Based
</p>

</div>

<div>

<p className="text-gray-500 text-sm">
Focus Area
</p>

<p className="text-lg font-semibold">
AI & Programming
</p>

</div>

</div>

</div>

{/* ACHIEVEMENTS */}

<div className="bg-white rounded-xl shadow p-8 mb-8">

<h3 className="text-xl font-semibold mb-6">
Achievements
</h3>

{achievements.length === 0 ?(

<p className="text-gray-500">
Complete diagnostic tests to earn achievements.
</p>

):(

<div className="grid md:grid-cols-2 gap-4">

{achievements.map((badge,i)=>(

<div
key={i}
className="border border-green-200 bg-green-50 text-green-700 p-4 rounded-lg font-medium"
>

{badge}

</div>

))}

</div>

)}

</div>

{/* ACCOUNT SETTINGS */}

<div className="bg-white rounded-xl shadow p-8">

<h3 className="text-xl font-semibold mb-6">
Account Settings
</h3>

<div className="flex gap-4">

<button
className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
onClick={()=>alert("Profile editing feature coming soon")}

>

Edit Profile </button>

<button
className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
onClick={resetProgress}

>

Reset Learning Data </button>

</div>

</div>

</Layout>

)

}
