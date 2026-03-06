import Layout from "../components/Layout"

export default function AdminLogs(){

return(

<Layout>

<h1 className="text-3xl font-bold mb-8">
Platform Activity Logs
</h1>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-600">
This section will show system events such as
user registrations, role changes and course updates.
</p>

</div>

</Layout>

)

}