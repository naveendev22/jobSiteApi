const jwt = require("jsonwebtoken");
 
exports.candidateVerify = async(req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = await authHeader && authHeader.split(" ")[1];
    jwt.verify(token,"mysecretKey",(err)=>{
        if(!err){
            next();
        }else{
            return res.status(403).json({
                success:false,
                message:`error occured ${err}`
            })
        };
    });
};
exports.recruiterVerify = async(req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = await authHeader && authHeader.split(" ")[1];
    jwt.verify(token,"mysecretKey",(err)=>{
        if(!err){
            next();
        }else{
            return res.status(403).json({
                success:false,
                message:`error occured ${err}`
            })
        };
    });
};