const router=require("express").Router()
const {register, login}=require("../controllers/auth.controller")

router.post("/login", login)
router.post("/register", register)

module.exports=router