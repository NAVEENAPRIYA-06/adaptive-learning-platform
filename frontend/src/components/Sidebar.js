import { Link, useLocation } from "react-router-dom"
import {
LayoutDashboard,
ClipboardList,
Map,
BarChart3,
Bot,
User,
Users,
BookOpen
} from "lucide-react"

export default function Sidebar(){

const location = useLocation()

/* GET LOGGED USER */

const user = JSON.parse(localStorage.getItem("user")) || {}
const role = user.role

/* STUDENT MENU */

const studentMenu = [
{ name:"Dashboard", path:"/dashboard", icon:LayoutDashboard },
{ name:"Diagnostic Test", path:"/test", icon:ClipboardList },
{ name:"Learning Roadmap", path:"/roadmap", icon:Map },
{ name:"Analytics", path:"/analytics", icon:BarChart3 },
{ name:"AI Tutor", path:"/chat", icon:Bot },
{ name:"Profile", path:"/profile", icon:User }
]

/* INSTRUCTOR MENU */

const instructorMenu = [
{ name:"Instructor Dashboard", path:"/instructor", icon:LayoutDashboard },
{ name:"Courses", path:"/courses", icon:BookOpen },
{ name:"Students", path:"/students", icon:Users },
{ name:"Profile", path:"/profile", icon:User }
]

/* ADMIN MENU */

const adminMenu = [
{ name:"Admin Dashboard", path:"/admin", icon:LayoutDashboard },
{ name:"User Management", path:"/users", icon:Users },
{ name:"System Analytics", path:"/admin-analytics", icon:BarChart3 },
{ name:"Activity Logs", path:"/admin-logs", icon:ClipboardList }
]

/* SELECT MENU */

let menu = studentMenu

if(role === "admin"){
menu = adminMenu
}
else if(role === "instructor"){
menu = instructorMenu
}

return(

<div className="w-72 min-h-screen bg-gradient-to-b from-green-600 to-emerald-700 text-white shadow-xl px-8 py-8 flex flex-col">

{/* LOGO */}

<h1 className="text-3xl font-semibold tracking-tight mb-12">
EduAI
</h1>

{/* MENU */}

<nav className="flex flex-col gap-3">

{menu.map((item,i)=>{

const Icon = item.icon
const active = location.pathname === item.path

return(

<Link
key={i}
to={item.path}
className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all duration-200

${active
? "bg-white text-green-700 shadow-md"
: "hover:bg-green-500/40"
}

`}
>

<Icon size={20} />

<span>
{item.name}
</span>

</Link>

)

})}

</nav>

{/* FOOTER */}

<div className="mt-auto pt-10 text-sm opacity-70">
AI Learning Platform
</div>

</div>

)

}