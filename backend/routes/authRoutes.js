const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

/* =========================
REGISTER
========================= */

router.post("/register", async(req,res)=>{

try{

const {name,email,password} = req.body

/* CHECK EXISTING USER */

const existingUser = await User.findOne({email})

if(existingUser){

return res.status(400).json({
message:"User already exists"
})

}

/* HASH PASSWORD */

const hashedPassword = await bcrypt.hash(password,10)

/* =========================
AUTO ROLE ASSIGNMENT
========================= */

let role = "student"

if(email === "admin@eduai.com"){
role = "admin"
}

else if(email.endsWith("@eduai.com")){
role = "instructor"
}

/* CREATE USER */

const user = new User({
name,
email,
password:hashedPassword,
role
})

await user.save()

res.json({
message:"User registered successfully"
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Registration failed"
})

}

})



/* =========================
LOGIN
========================= */

router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body

/* FIND USER */

const user = await User.findOne({email})

if(!user){

return res.status(400).json({
message:"Invalid email or password"
})

}

/* CHECK PASSWORD */

const validPassword = await bcrypt.compare(password,user.password)

if(!validPassword){

return res.status(400).json({
message:"Invalid email or password"
})

}

/* CREATE TOKEN */

const token = jwt.sign(

{
id:user._id,
role:user.role
},

"SECRETKEY",

{expiresIn:"7d"}

)

/* RETURN USER DETAILS */

res.json({

token,

user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}

})

}catch(err){

console.log(err)

res.status(500).json({
message:"Login failed"
})

}

})

module.exports = router