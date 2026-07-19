import mongoose from "mongoose";

const connectDB = async () => {
    try{
        console.log("ENV VALUE:",process.env.MONGO_DB_URL);
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDB Connected Successfully");
        console.log(conn.connection.host);
    }catch(error){
        console.log(error);
        process.exit(1);
        
    }
};
export default connectDB;