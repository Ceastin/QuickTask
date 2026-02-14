const express=require("express");
const router=express.Router();

const {createTask,viewTask,deleteTask,modifyTask}=require("../controllers/homepageControllers")
router.use("/info",viewTask);
router.use("/add",createTask);
router.patch("/edit/:id", modifyTask);
router.use("/remove/:id",deleteTask);
module.exports=router;