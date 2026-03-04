import { useState } from "react";
import API from "../services/api";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const registerUser = async () => {

    await API.post("/auth/register",{
      name,
      email,
      password,
      role:"student"
    });

    alert("Registered successfully");

  };

  return (
    <div>

      <h2>Register</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={registerUser}>
        Register
      </button>

    </div>
  );
}

export default Register;