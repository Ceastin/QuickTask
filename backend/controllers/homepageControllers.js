const Task=require("../models/Task");
const mongoose=require("mongoose");

const createTask=async(req,res)=>{
    try{
        console.log(req.body);
        const {title,dueDate,description,priority}=req.body;
        console.log("erer");
        const {userId}=req.user;
        console.log("erer");
        if(!title||!dueDate){
            return res.status(400).json({message:"Title and DueDate required"});
        }
        const task=await Task.create({
           user:userId,
           title,
           description,
           priority,
           dueDate
        });
        return res.status(201).json({message:"Task created Successfully",task});
    }catch(err){
        console.log(err);
        return res.status(470).json({ error: err.message });
    }
};
const deleteTask=async (req,res)=>{
    try{
        const {userId}=req.user;
        const {id}=req.params;
        const task=await Task.findOneAndDelete({
            _id:id,
            user:userId
        });
        if(!task)
        {
            return res.status(400).json({message:"Task Not Found"});
        }
        return res.status(200).json({message:"Task deleted Successfully"});
    }catch(err)
    {
        return res.status(400).json({error:err.message});
    }
};
const viewTask=async (req,res)=>{
    try{
        const {userId}=req.user;
        const data=await Task.find({user:userId});
        if(!data){
            return res.status(404).json({message:"No tasks found"});
        }
        console.log("your reached here");
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(400).json({error:err.message});
    }
};
const modifyTask=async (req,res)=>{
    try{
        const {userId}=req.user;
        const {id}=req.params;
        const updates =req.body;
        delete updates.user;
        console.log("till here");
        if(updates.status==="Completed")
        {
            updates.completedAt=new Date();
        }
        if (updates.status && updates.status !== "Completed") {
            updates.completedAt = null;
        }
        const task = await Task.findByIdAndUpdate(
        id,
        { $set: req.body },   
        {
            new: true,         
            runValidators: true
        }
        );
        if(!task)
        {
            return res.status(404).json({message:"Task Not Found"});
        }
        return res.status(200).json({message:"Task Updated Successfully",task});

    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({error:err.message});
    }
};
module.exports={createTask,deleteTask,viewTask,modifyTask};
