const User=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

exports.register=async(req, res)=>{
  try {
    const {fullName, email, password}=req.body
    const exists=User.findOne({email})
    if(exists){
      return res.status(400).json({
        messge:"This email is Already exists"
      })
    }
    const hashedPassword=await bcrypt.hash(password, 10)
    const user=await User.create({fullName, email, password:hashedPassword})
    res.status(201).json({
      message:"User created successfully"
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

exports.login=async (req,res)=>{
  try {

    const {password, email}=req.body

    const user=await User.findOne({email})

    if(!user){
      return res.status(400).json({messge:"Invalid credentials"})
    }

    const isMatch=await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"})
    }

    const token=jwt.sign({
      id:user._id,
      role:user.role
    }, process.env.JWT_SECRET,
    {
      expiresIn:"7d"
    })
    res.json({token, user:{
      id:user._id,
      fullName:user.fullName,
      role:user.role
    }})

  } catch (error) {
    res.status(500).json({
      message:error.message
    })
    console.log(error.message)
  }
}