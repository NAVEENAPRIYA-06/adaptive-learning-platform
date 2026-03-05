import { Link } from "react-router-dom";

export default function Sidebar(){

return(

<div className="w-64 bg-white shadow-lg p-6">

<h1 className="text-2xl font-bold text-green-600 mb-10">
EduAI
</h1>

<nav className="space-y-4">

<Link
to="/dashboard"
className="block p-3 rounded-lg hover:bg-gray-100"
>
Dashboard
</Link>

<Link
to="/test"
className="block p-3 rounded-lg hover:bg-gray-100"
>
Diagnostic Test
</Link>

<Link
to="/roadmap"
className="block p-3 rounded-lg hover:bg-gray-100"
>
Learning Roadmap
</Link>

<Link
to="/analytics"
className="block p-3 rounded-lg hover:bg-gray-100"
>
Analytics
</Link>

<Link
to="/profile"
className="block p-3 rounded-lg hover:bg-gray-100"
>
Profile
</Link>

</nav>

</div>

)

}