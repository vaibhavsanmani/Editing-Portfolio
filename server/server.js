import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// CLOUDINARY UPLOAD PROXY
// ==========================================

app.post(
  "/api/videos/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file received.",
        });
      }

      const options = {
        resource_type: "video",
      };

      if (req.body.upload_preset) {
        options.upload_preset = req.body.upload_preset;
      }

      const streamUpload = (fileBuffer) =>
        new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          uploadStream.end(fileBuffer);
        });

      const result = await streamUpload(req.file.buffer);

      return res.json(result);
    } catch (error) {
      console.error("Cloudinary upload error:", error);

      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed.",
        error: error.message,
      });
    }
  }
);

// ==========================================
// DELETE CLOUDINARY VIDEO
// ==========================================

app.delete("/api/videos/:publicId", async (req, res) => {
  try {
    const publicId = decodeURIComponent(
      req.params.publicId
    );

    console.log("Deleting Cloudinary video:");
    console.log(publicId);

    const result =
      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: "video",
          invalidate: true,
        }
      );

    console.log(
      "Cloudinary delete result:",
      result
    );

    if (
      result.result !== "ok" &&
      result.result !== "not found"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cloudinary could not delete the video.",
        result,
      });
    }

    return res.json({
      success: true,
      message: "Video deleted from Cloudinary.",
      result,
    });
  } catch (error) {
    console.error(
      "Cloudinary deletion error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete video.",
    });
  }
});

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "SnipSync backend is running",
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});