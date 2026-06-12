const Student=require("../models/student.model")
exports.getStats=async(req, res)=>{
  const totalStudents=await Student.countDocuments()
  const totalCourses=(await Student.distinct("course")).length
  const averageAge=await Student.aggregate([
    {
      $group:{_id:null, avgAge:{$avg:"$age"}}
    }
  ])
  res.json({totalStudents, totalCourses, averageAge:averageAge[0]?.avgAge||0})
}

exports.courseStats=async(req,res)=>{
  const stats=await Student.aggregate([
    {
      $group:{_id:"$course", total:{$sum:1}}
    },
    {
      $sort:{total:-1}
    }
  ])
  res.json(stats)
}