const Student = require("../models/student.model")
const generateStudentId = require("../utils/generateStudentId")

exports.getStudents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search?.trim() || ""
    const skip = (page - 1) * limit

    const filter = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } }
          ]
        }
      : {}

    const total = await Student.countDocuments(filter)
    const students = await Student.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    if (req.query.page || req.query.limit) {
      return res.json({
        students,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })
    }

    res.json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log(error.message)
  }
}

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, phone, gender, age, course } = req.body

    if (!firstName || !lastName || !phone || !gender || !age || !course) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const studentId = await generateStudentId()
    const student = await Student.create({
      studentId,
      firstName,
      lastName,
      age,
      course,
      phone,
      gender
    })

    res.status(201).json(student)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" })
    }

    res.json(student)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" })
    }

    res.json(student)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" })
    }

    res.json({ message: "Deleted student succesfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

