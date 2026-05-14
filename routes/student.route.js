const router = require("express").Router()
const Student = require("../models/student.model")

router.get("/", async (req, res) => {
  const students = await Student.find()
  res.json(students)
})

router.post("/", async (req, res) => {
  const student = new Student(req.body)
  await student.save()
  res.json(student)
})

router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id)
  res.json({
    message: "Deleted student"
  })
})

router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

module.exports = router