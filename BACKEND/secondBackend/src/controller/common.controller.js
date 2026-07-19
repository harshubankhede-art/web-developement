import cloudinary from "../config/cloudinary.config.js";
import User from "../models/auth.model.js";

export const EditUserProfile = async (req, res, next) => {
  try {
    const { fullname, email, phone } = req.body;
    const newPhoto = req.file;
    console.log(req.file);

    if (!email || !fullname || !phone) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not Register");
      error.statusCode = 400;
      return next(error);
    }

    if (newPhoto) {
      const b64 = Buffer.from(newPhoto.buffer).toString("base64");
      const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "",
        height: 500,
        width: 500,
        crop: "fill",
      });
      console.log(result.secure_url);
      console.log(result.public_id);

      existingUser.photo.url = result.secure_url;
      existingUser.photo.publicId = result.public_id;
    }
    existingUser.fullname = fullname;
    existingUser.email = email;
    existingUser.phone = phone;

    await existingUser.save();
    res.status(200).json({
      message: "profile updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};
