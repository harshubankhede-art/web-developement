import { loginUser } from "../controller/auth.controller.js";
import { registerUser } from "../controller/auth.controller.js";

import express from "express";

const route = express.Router();
route.post("/login", loginUser);
route.post("/register", registerUser);

export default route;
