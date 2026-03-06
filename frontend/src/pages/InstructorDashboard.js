import Layout from "../components/Layout"

export default function InstructorDashboard(){

return(

<Layout>

<h1 className="text-3xl font-bold mb-8">
Instructor Dashboard
</h1>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="text-lg font-semibold">Courses Created</h3>
<p className="text-3xl font-bold text-green-600 mt-2">0</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="text-lg font-semibold">Students Enrolled</h3>
<p className="text-3xl font-bold text-green-600 mt-2">0</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="text-lg font-semibold">Assignments</h3>
<p className="text-3xl font-bold text-green-600 mt-2">0</p>
</div>

</div>

</Layout>

)

}