import mongoose from "mongoose";

const UserScema = mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
        },
        dob:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true,
        },
        photo:{
            url:{
                type:String,
            },
            publicId:{
                type:String,
            },
        },
    },
    {
        timestamps:true,
    },
)

const User = mongoose.model("User",UserScema);
export default User;