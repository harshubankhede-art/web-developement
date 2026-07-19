import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import authController from "./src/router/auth.route.js";
import connectDB  from "./src/config/dbconnection.config.js";
import cors from "cors";
import cloudinary from "./src/config/cloudinary.config.js";
import commonRoute from "./src/router/common.route.js"
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173",credentials: true}));
app.use("/auth",authController);
app.use("/common",commonRoute);


app.use((err,req,res,next) => {
    const errMessage = err.message || "internal server error";
const errStatusCode = err.statusCode || 500;
    res.status(errStatusCode).json({
        message: errMessage,
    });
});
const PORT = process.env.PORT || 4500;

app.listen(PORT, async () =>{
    console.log("Server Started");
    await connectDB();
    try{
        const result = await cloudinary.api.ping();
        console.log(result);
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
});