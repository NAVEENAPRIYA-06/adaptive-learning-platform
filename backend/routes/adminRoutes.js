const express = require("express")
const User = require("../models/User")
const TestResult = require("../models/TestResult")
const router = express.Router()

/* =========================
ADMIN DASHBOARD STATS
========================= */

router.get("/stats", async (req,res)=>{

try{

const totalUsers = await User.countDocuments()

const students = await User.countDocuments({role:"student"})

const instructors = await User.countDocuments({role:"instructor"})

const admins = await User.countDocuments({role:"admin"})

const totalTests = await TestResult.countDocuments()

const tests = await TestResult.find()

let avgScore = 0

if(tests.length > 0){

avgScore = Math.round(

tests.reduce((sum,t)=>sum+t.percentage,0)/tests.length

)

}

res.json({

totalUsers,
students,
instructors,
admins,
totalTests,
avgScore

})

}catch(err){

console.log(err)

res.status(500).json({

message:"Failed to fetch admin stats"

})

}

})

/* =========================
GET ALL USERS
========================= */

router.get("/users", async (req,res)=>{

try{

const users = await User.find().select("-password")

res.json(users)

}catch(err){

console.log(err)

res.status(500).json({
message:"Failed to fetch users"
})

}

})

/* =========================
DELETE USER
========================= */

router.delete("/users/:id", async (req,res)=>{

try{

await User.findByIdAndDelete(req.params.id)

res.json({
message:"User deleted"
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Failed to delete user"
})

}

})

/* =========================
UPDATE USER ROLE
========================= */

router.put("/users/:id/role", async (req,res)=>{

try{

const {role} = req.body

const user = await User.findByIdAndUpdate(

req.params.id,

{role},

{new:true}

)

res.json(user)

}catch(err){

console.log(err)

res.status(500).json({
message:"Failed to update role"
})

}

})

module.exports = router