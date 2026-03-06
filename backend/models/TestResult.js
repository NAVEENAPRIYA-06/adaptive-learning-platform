const mongoose = require("mongoose")

const TestResultSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

subject:String,

score:Number,

total:Number,

percentage:Number,

date:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("TestResult",TestResultSchema)