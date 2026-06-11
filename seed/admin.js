const bcrypt=require("bcryptjs")
const User=require("../models/user.model")

const seedAdmin=async()=>{
  const exists=await User.findOne({email:"muhammadjonovsardorbek07@gmail.com"})
  if(exists){
    console.log("Admin existed")
    return
  }
  const password= await bcrypt.hash("sardorbek01", 10)
  await User.create({
    fullName:"Sardorbek",
    email:"muhammadjonovsardorbek07@gmail.com",
    password, role:"admin"
  })
  console.log("admin created")
}

module.exports={seedAdmin}