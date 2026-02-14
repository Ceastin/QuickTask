const jwt=require("jsonwebtoken");
const config=require("../config/config");


const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
        jwt.verify(token,config.jwt.secret,(err,user)=>{
            if(err)
            {
                return res.sendStatus(403);
            }
            req.user=user;

            // req.user = {
            //     id: 123,
            //     email: "sahil@gmail.com",
            //     iat: 1700000000, issued at timestamp
            //     exp: 1700003600
            // }
            console.log("Say hi to middleware",user);
            next();
        });
    }
    else
    {
        res.sendStatus(401);
    }
}
module.exports=authMiddleware;