require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const errorMiddleware=require("./middlewares/error.middleware")

const app=express()
app.use(express.json())
app.use(express.static("public"))
app.use(errorMiddleware)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log("DB is connected sucsessfully",)
})
.catch((err)=>{
  console.log(err)
})

app.use("/api/students", require("./routes/student.route"))
app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/dashboard", require("./routes/dashboard.route"))

app.listen(process.env.PORT, ()=>{
  console.log(`port is running ${process.env.PORT} port`)
})
