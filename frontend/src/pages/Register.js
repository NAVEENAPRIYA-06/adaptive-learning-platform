import { useState } from "react";
import API from "../services/api";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const registerUser = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registered successfully");

      window.location.href="/"

    }catch{
      alert("Registration failed")
    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-green-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          className="border p-3 rounded w-full mb-4"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full mb-4"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full mb-6"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg w-full"
          onClick={registerUser}
        >
          Register
        </button>

      </div>

    </div>

  );
}

export default Register;