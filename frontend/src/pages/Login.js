import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async()=>{

    try{

      const res = await API.post("/auth/login",{email,password})

      const {token,user} = res.data

      /* SAVE TOKEN */

      localStorage.setItem("token",token)

      /* SAVE USER */

      localStorage.setItem("user",JSON.stringify(user))

      /* ROLE BASED REDIRECT */

      if(user.role === "admin"){
        window.location.href="/admin"
      }

      else if(user.role === "instructor"){
        window.location.href="/instructor"
      }

      else{
        window.location.href="/dashboard"
      }

    }catch{

      alert("Invalid credentials")

    }

  }

  return(

    <div className="flex items-center justify-center h-screen bg-green-100">

      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden w-[850px]">

        {/* LEFT PANEL */}

        <div className="w-1/2 bg-green-200 flex flex-col items-center justify-center p-8">

          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Distance Learning Programs
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Attend live and recorded classes at your convenience.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            className="w-40"
            alt="learning"
          />

        </div>

        {/* RIGHT PANEL */}

        <div className="w-1/2 p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6">
            Welcome Back
          </h2>

          <input
            className="border p-3 rounded mb-4"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="border p-3 rounded mb-6"
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-sm mt-4 text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>

  )

}