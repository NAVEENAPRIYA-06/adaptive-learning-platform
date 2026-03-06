import Sidebar from "./Sidebar";

export default function Layout({children}){

const user = JSON.parse(localStorage.getItem("user")) || {}

const handleLogout = () => {

localStorage.removeItem("token")
localStorage.removeItem("user")

window.location.href="/"

}

return(

<div className="flex min-h-screen bg-gray-100">

{/* SIDEBAR */}

<Sidebar/>

{/* MAIN CONTENT */}

<div className="flex-1 flex flex-col">

{/* TOP HEADER */}

<div className="flex justify-between items-center bg-white px-10 py-4 shadow">

<h2 className="text-xl font-semibold text-gray-700">
Welcome, {user.name}
</h2>

<div className="flex items-center gap-6">

<span className="text-gray-500 text-sm capitalize">
{user.role}
</span>

<button
onClick={handleLogout}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
>
Logout
</button>

</div>

</div>

{/* PAGE CONTENT */}

<div className="p-10">

{children}

</div>

</div>

</div>

)

}