const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
  studentId: {
    type:String,
    requred:true,
    unique:true
  },
  firstName:{
    type: String,
    required:true
  },
  lastName:{
    type: String,
  required:true},
  age:{
    type: Number,
    required:true
  },
  course: {
    type:String,
    required:true
  },
  phone: {
    type:String,
    required:true
  },
  gender:{
    type:String,
    enum:["male", "female"]
  }
},{timestamps:true})

module.exports=mongoose.model("Student", studentSchema)