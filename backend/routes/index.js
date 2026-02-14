const express=require("express");
const router=express.Router();
const userRouter=require("./user");
const authMiddleware=require("../middlewares/authMiddleware");
const browseRouter=require("./brows");
router.use("/user",userRouter);
router.use("/home",authMiddleware,browseRouter);
module.exports=router;
