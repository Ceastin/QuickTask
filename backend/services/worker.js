// ✅ CORRECT SYNTAX: Pass an object with 'path'
require('dotenv').config({ path: "../.env" });
const amqp=require('amqplib');
const mongoose=require('mongoose');
const {sendReminderEmail}=require("../utils/email");


const Task=require("../models/Task");
const User=require("../models/User");


async function startWorker() {
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Worker connected  to MongoDB");
        const connection=await amqp.connect({
            protocol: 'amqp',
            hostname: 'localhost',
            port:5672,
            username:'ceastin',
            password: 'sahilsri'
        });
        channel= await connection.createChannel();

        const mainQueue='main_q';
        await channel.assertQueue(mainQueue,{durable:true});
        console.log(" Worker Server is listening for expired reminders on 'main_q'...");


        channel.consume(mainQueue,async (msg)=>{
            if(msg!==null){
                const data=JSON.parse(msg.content.toString());
                console.log(msg);
                if(data.eventType==="REMINDER_EMAIL")
                {
                    console.log(`\n Validating Task ID:${data.taskId}`);
                    try{
                        const task=await Task.findById(data.taskId);
                        if(!task)
                        {
                            console.log("Task was deleted. Dropping reminder.");
                            return channel.ack(msg);
                        }
                        if(task.status==="Completed"){
                            console.log("Task already completed. Dropping reminder.");
                            return channel.ack(msg);
                        }
                        const currentDueDateMs = new Date(task.dueDate).getTime();
                        if (currentDueDateMs !== data.originalDueDate) {
                            console.log("📅 Due date was changed. Dropping outdated reminder.");
                            return channel.ack(msg);
                        }

                        // Validation Passed! Fetch User and Send Email
                        const user = await User.findById(task.user);
                        if (user && user.email) {
                            console.log(`✉️ Task valid! Sending email to ${user.email}...`);
                            console.log(user.email)
                            console.log(task.title);
                            await sendReminderEmail("22bai71105@cuchd.in", task.title);
                        }

                        // Acknowledge the message so it leaves the queue forever
                        channel.ack(msg);
                    }
                    catch(error)
                    {
                        console.error("X Worker Error:",error);
                        channel.nack(msg,false,true);
                    }
                }
            }
        });
    }
    catch(err){
        console.error("Failed to start worker:", err);
    }
}

startWorker();