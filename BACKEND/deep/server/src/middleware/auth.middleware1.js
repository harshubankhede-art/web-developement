import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const AuthProtect  = async (req,res,next) => {
    try{
        const token =  req.cookies.oreo;
        if(!token) {
            const error = new Error("cookie expired");
            error.statusCode = 400;
            return next(error);
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        if(!decode) {
            const error = new Error("session expired");
            error.statusCode = 401;
            return next(error);
        }
        const isVerified = await User.findById(decode.id);
        if(!isVerified) {
            const error = new Error("session expired");
            error.statusCode = 401;
            return next(error);
        }
        req.user = isVerified;
        next();
    }catch(error) {
        console.log(error.message);
        return next(error);
    }
};