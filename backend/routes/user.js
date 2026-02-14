const express=require("express");
const router=express.Router();
const { signUp,login,allUser }=require("../controllers/authControllers");
router.use("/login",login);
router.use("/registration",signUp);
router.use("/info",allUser)
module.exports=router;
