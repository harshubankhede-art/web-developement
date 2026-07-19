import express from 'express';
import multer from 'multer';
import { EditUserProfile } from '../controller/common.controller.js';

const upload = multer();
const route = express.Router();

route.put("/edit-profile",upload.single("displayPic"),EditUserProfile);

export default route;