const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
  studentId: String,
  firstName: String,
  lastName: String,
  age: Number,
  course: String,
  phone: String
})

module.exports=mongoose.model("Student", studentSchema)