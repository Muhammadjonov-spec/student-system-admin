const studentModel = require("../models/student.model")

exports.getStudents=async(req, res)=>{
  try {
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||10
    const search=req.query.search||""
    const skip=(page-1)*limit
    const filter={}
    if(search){
      filter.$or=[
        {
          firstName:{$regex:search, $options:"i"}
        },
        {
          lastName:{$regex:search, $options:"i"}
        }
      ]
    }
    const total=await studentModel  
    
  } catch (error) {
    res.status(500).json({message:error.message})
    console.log(error.message)
  }
}