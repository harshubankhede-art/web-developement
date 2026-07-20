import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const AuthProtect  = async (req,res,next) => {
    try{
        const token =  req.cookies
    }
}