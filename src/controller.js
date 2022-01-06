const candidateModel = require("./model/candidateModel");
const recruiterModel = require("./model/recruiterModel");
const jwt = require("jsonwebtoken");

exports.addCandidate = async(req,res)=>{
    const params = req.body;
    const userExist = await this.candidateModel
    if (params.password != params.confirmPassword){
        return res.status(422).json({
            success:false,
            message:`Password and confirm password should be shame`
        })
    }else{
        await new candidateModel({
            fieldsName:params.fieldsName,
            email:params.email,
            password:params.password,
            confirmPassword:params.confirmPassword,
            mobile:params.mobile,
            resume:params.resume,
            skillsets:params.skillsets,
            experience:params.experience
        }).save() 
        return res.status(200).json({
            success:true,
            message:"candidate added successfullly",
            data:[]
        })
    }
};
exports.listCandidate = async(req,res)=>{
    const list = await candidateModel.find({
        isactive:true
    });
    return res.status(200).json({
        success:true,
        data:list
    });
};
exports.candidateLogin = async(req,res)=>{
    const params = req.body;
    const login = await candidateModel.findOne({email:params.email},{password:params.password});
    if (login){
        const accessToken = jwt.sign({id:login.id , password:login.password},"mysecretKey");
        res.status(200).json({
            email:params.email,
            password:params.password,
            accessToken
        })

        }else{
        return res.status(400).json({
            success:false,
            message:"email or password incorrect"
        })
    }
};
exports.addRecruiter = async(req,res)=>{
    const params = req.body; 
    const passwordExits = await recruiterModel.findOne({password:params.password});
    const userExist = await recruiterModel.findOne({
        $or:[{
            email:params.email
        },{
            aadharNo:params.aadharNo
        },{
            mobile:params.mobile
        }]
    });
    if (params.password != params.confirmPassword){
        return res.status(422).json({
            success:false,
            message:`Password and Confirm Password should be same`
        });
    }else if(userExist){
        return res.status(403).json({
            success:false,
            message:`${params.email} or ${params.aadharNo} already exists please login`
        });
    }else if (passwordExits){
        return res.status(403).json({
            message :`${params.password} already used please use other password`
        });
    }else{
        await new recruiterModel({
            name:params.name,
            email:params.email,
            password:params.password,
            confirmPassword:params.confirmPassword,
            mobile:params.mobile,
            aadharNo:params.aadharNo
        }).save() 
        return res.status(200).json({
            success:true,
            message:"recruiter added successfullly",
            data:[]
        })
    };
};
exports.listRecruiter = async(req,res)=>{
    const list = await recruiterModel.find({
        isactive:true
    });
    return res.status(200).json({
        success:true,
        data:list
    });
};
exports.recruiterLogin = async(req,res)=>{
    const params = req.body;
    const login = await recruiterModel.findOne({email:params.email},{password:params.password});
    if (login){
        const accessToken = jwt.sign({id:login.id , password:login.password},"mysecretKey");
        res.status(200).json({
            email:params.email,
            password:params.password,
            accessToken
        })
    }else{
        return res.status(400).json({
            success:false,
            message:"email or password incorrect"
        })
    }
};
exports.recruiterDelete = async (req,res)=>{
   const deletRecruiter = await recruiterModel.findByIdAndDelete(req.body._id);
   if (deletRecruiter){
       return res.status(200).json({
           success:true,
           message:` deleted successfully`
       })
   }else {
       return res.status(403).json({
           success:false,
           message:`can't find id ${req.body._id} `
           
       })
   }

};

candidateModel.aggregate([
    {
        $match:{"mobile":12345}
    },
   
    {
        $lookup:{
            from:"recruiter",
            localField:"mobile",
            foreignField:"mobile",
            as:"mobileNo"
        }
    },
    {
        $unwind:"mobileNo"
    },
    {
        $project:{
            "name":1,
            "email":1,
            "mobileNo":1
        }
    },
    {
        $count:"MobileNo"
    }
    
])
candidateModel.aggregate([
    {$group:
        {_id:"email",totalEmail:
         {$sum:1}
     }
    },
    {
        $addFields:{
            "mobile.faxNo":"Not required"
        }
    },
    {
        $replaceRoot:{
            newRoot:"mobile"
        }
    },
    {
        $project:
        {
            contact:{$mergeObject:["$mobile","$faxNo"]}
        }
    },
    
])
