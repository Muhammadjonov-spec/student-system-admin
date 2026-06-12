const { model } = require("mongoose")
const Student=require("../models/student.model")
module.exports=async()=>{
  const lastStudent=await Student.findOne().sort({createdAt:-1})
  if(!lastStudent){
    return "ST001"
  }
  const lastNumber= parseInt(lastStudent.studentId.replace("ST", "")) 
  const nextNumber=lastNumber+1
  return `ST${String(nextNumber).padStart(3,"0")}`
}