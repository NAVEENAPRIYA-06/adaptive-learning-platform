import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import API from "../services/api"

export default function AdminDashboard(){

const [stats,setStats] = useState({
totalUsers:0,
students:0,
instructors:0,
admins:0,
totalTests:0,
avgScore:0
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
Admin Dashboard
</h1>

<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">

{/* TOTAL USERS */}

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Total Users</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.totalUsers}
</h2>
</div>


{/* STUDENTS */}

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Students</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.students}
</h2>
</div>


{/* INSTRUCTORS */}

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Instructors</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.instructors}
</h2>
</div>


{/* ADMINS */}

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Admins</p>
<h2 className="text-3xl font-bold text-green-600">
{stats.admins}
</h2>
</div>


{/* TOTAL TESTS */}

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Tests Taken</p>
<h2 className="text-3xl font-bold text-blue-600">
{stats.totalTests}
</h2>
</div>


{/* AVERAGE SCORE */}

<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Average Score</p>
<h2 className="text-3xl font-bold text-purple-600">
{stats.avgScore}%
</h2>
</div>

</div>

</Layout>

)

}