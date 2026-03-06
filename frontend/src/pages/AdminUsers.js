import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import API from "../services/api"

export default function AdminUsers(){

const [users,setUsers] = useState([])

/* FETCH USERS */

const fetchUsers = async()=>{

try{

const res = await API.get("/admin/users")

setUsers(res.data)

}catch(err){

console.log(err)

}

}

useEffect(()=>{

fetchUsers()

},[])

/* DELETE USER */

const deleteUser = async(id)=>{

if(!window.confirm("Delete this user?")) return

try{

await API.delete(`/admin/users/${id}`)

fetchUsers()

}catch(err){

console.log(err)

}

}

/* CHANGE USER ROLE */

const changeRole = async(id,currentRole)=>{

let newRole = currentRole === "student" ? "instructor" : "student"

try{

await API.put(`/admin/users/${id}/role`,{
role:newRole
})

fetchUsers()

}catch(err){

console.log(err)

}

}

return(

<Layout>

<h1 className="text-3xl font-bold mb-8">
User Management
</h1>

<div className="bg-white shadow rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">Name</th>
<th className="p-4 text-left">Email</th>
<th className="p-4 text-left">Role</th>
<th className="p-4 text-left">Action</th>

</tr>

</thead>

<tbody>

{users.map(user=>(

<tr key={user._id} className="border-t">

<td className="p-4">{user.name}</td>

<td className="p-4">{user.email}</td>

<td className="p-4 capitalize">{user.role}</td>

<td className="p-4 flex gap-2">

{/* ROLE CHANGE BUTTON */}

{user.role !== "admin" && (

<button
onClick={()=>changeRole(user._id,user.role)}
className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
{user.role === "student" ? "Promote" : "Demote"}
</button>

)}

{/* DELETE BUTTON */}

<button
onClick={()=>deleteUser(user._id)}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</Layout>

)

}