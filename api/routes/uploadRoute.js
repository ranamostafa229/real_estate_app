import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinaryConfig.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

function uploadBufferToCloudinary(buffer, folder = "real_estate") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

router.post("/", upload.array("images"), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) =>
      uploadBufferToCloudinary(file.buffer),
    );

    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => r.secure_url || r.url);

    return res.json({ success: true, urls });
  } catch (err) {
    next(err);
  }
});

export default router;
