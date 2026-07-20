import jwt from "jsonwebtoken";

export const genToken = async (User,res) => {
    try{
        const payload = { id: User._id };
        const token = await jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: "1d",
        });
        res.cookie("oreo",token,{
            maxAge:1000 * 60 * 60 * 24,
            httpOnly:true,
            secure:false,
            sameSite:"lax", 
        });
        console.log(token); 
    }catch(error) {
        console.log(error.message);
        throw error;
    }
};