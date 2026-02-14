const config=require("./config/config");
const express=require("express");
const cors=require("cors");
const app=express();
const mainRouter=require("./routes/index");
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo DB connected...")).catch((err)=>console.log(err));
app.use(cors({
    origin:'*'//origin.frontend.url
}));

app.use(express.json());

app.use("/api/v1",mainRouter);
app.listen(config.server.port,()=>{console.log("Server Running on port",config.server.port)});
