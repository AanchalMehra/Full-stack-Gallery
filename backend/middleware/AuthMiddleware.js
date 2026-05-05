import jwt from "jsonwebtoken";

export const  auth=async(req,res,next)=>{
    try{
        
        console.log("TOKEN:", req.headers.authorization);
        const authHeader = req.headers.authorization;
        if(!authHeader|| !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ err: "No token provided" });
        }

        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user= decoded; // { id, role }
        next();

    }
    catch(err){
        return res.status(401).json({err:err.message});
    }
}