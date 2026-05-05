export const isAdmin=(req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({err: "Unauthorized"})
        }
        if (req.user.role !== "ADMIN") {
          return res.status(403).json({ err: "Access denied. Admin only." });
        }
        next();

    }
    catch(err){
         return res.status(500).json({err:err.message});
    }


}