const mongoose = require("mongoose");
const {Schema} = mongoose;
const recruiterSchema = new Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        unique:true,
        type:String
    },
    confirmPassword:{
        required:true,
        type:String
    },
    mobile:{
        required:true,
        unique:true,
        type:Number
    },
    aadharNo:{
        required:true,
        unique:true,
        type:Number
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdBy:String,
    creadtedAt:{
        type:Date,
        default:Date.now
    },
    updatedBy:String,
    updtaedAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("recruiter",recruiterSchema);