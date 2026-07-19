
import User from "../models/auth.model.js";
import bcrypt from "bcrypt";
export const registerUser = async (req,res,next) => {
    try{
        const {fullName,email,password,phone,gender,dob} = req.body;
        
        if(!fullName ||!email ||!password ||!phone ||!gender ||!dob) {
            const error = new Error("All field requared");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            const error = new Error("Email already registerd");
            error.statusCode = 409;
            return next(error); 
        }

        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,SALT);

        const user = await User.create({
            fullName,
            email,
            password:hashedPassword,
            phone,
            gender,
            dob,
        });
        return res.status(201).json({
            message:"User register Successfully",
            user,
        });
    }catch(error){
        next(error);
    }
};

export const loginUser = async(req,res,next) => {
    try{
        const {email,password} = req.body;

    if(!email ||!password){
        const error = new Error("All field Requard");
        error.statusCode = 400;
        return next(error);
    }
    const existingUser  = await User.findOne({email});
    if(!existingUser){
        const error = new Error("Email not Register");
        error.statusCode = 400;
        return next(error);
    }
    const isVarified = await bcrypt.compare(password,existingUser.password);
    if(!isVarified){
        const error = new Error("password dosen't match");
        error.statusCode = 400;
        return next(error);
    }
    
    return res.status(200).json({
        message:"login Successfully"
    });
    }catch(error){
        next(error);
    }
};