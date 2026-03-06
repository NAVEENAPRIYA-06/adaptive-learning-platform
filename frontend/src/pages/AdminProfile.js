import Layout from "../components/Layout"

export default function AdminProfile(){

const user = JSON.parse(localStorage.getItem("user"))

return(

<Layout>

<h1 className="text-3xl font-bold mb-8">
Admin Profile
</h1>

<div className="bg-white p-8 rounded-xl shadow max-w-xl">

<div className="space-y-6">

<div>

<p className="text-gray-500 text-sm">Name</p>

<p className="text-xl font-semibold">
{user?.name}
</p>

</div>

<div>

<p className="text-gray-500 text-sm">Email</p>

<p className="text-xl font-semibold">
{user?.email}
</p>

</div>

<div>

<p className="text-gray-500 text-sm">Role</p>

<p className="text-xl font-semibold capitalize text-green-600">
{user?.role}
</p>

</div>

</div>

</div>


{/* ADMIN PERMISSIONS */}

<div className="bg-white p-8 rounded-xl shadow mt-8">

<h2 className="text-xl font-semibold mb-4">
Admin Permissions
</h2>

<ul className="space-y-2 text-gray-600">

<li>• Manage platform users</li>

<li>• Promote or demote instructors</li>

<li>• Monitor platform analytics</li>

<li>• Remove inactive accounts</li>

<li>• Control system settings</li>

</ul>

</div>

</Layout>

)

}