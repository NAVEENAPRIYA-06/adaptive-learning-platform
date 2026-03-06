import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import API from "../services/api"

export default function AdminAnalytics(){

const [stats,setStats] = useState({
totalUsers:0,
students:0,
instructors:0,
admins:0
})

useEffect(()=>{

const fetchStats = async()=>{

try{

const res = await API.get("/admin/stats")

setStats(res.data)

}catch(err){

console.log(err)

}

}

fetchStats()

},[])

return(

<Layout>

<h1 className="text-3xl font-bold mb-8">
System Analytics
</h1>

{/* STAT CARDS */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Total Users</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.totalUsers}
</h2>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Students</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.students}
</h2>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Instructors</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.instructors}
</h2>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Admins</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.admins}
</h2>
</div>

</div>


{/* PLATFORM INFO */}

<div className="bg-white p-8 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-4">
Platform Overview
</h2>

<ul className="space-y-3 text-gray-600">

<li>• AI diagnostic tests are available for students.</li>

<li>• Personalized learning roadmaps are generated automatically.</li>

<li>• AI tutor assists students with coding and theory questions.</li>

<li>• Instructors manage courses and learning materials.</li>

<li>• Admin monitors platform users and system activity.</li>

</ul>

</div>

</Layout>

)

}