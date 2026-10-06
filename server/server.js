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
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
    ],
    credentials: true,
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
// AI CHAT ENDPOINT
// ==========================================

const fallbackReply = (message) => {
  const text = (message || "").toLowerCase();

  if (text.includes("birthday") || text.includes("birth day")) {
    return "For a birthday shoot, I’d suggest a short, high-energy edit with 3–5 key moments, fast pacing, and a final cinematic payoff. Budget-wise, it usually lands around ₹8,000–₹25,000 depending on the footage and turnaround.";
  }

  if (text.includes("price") || text.includes("cost") || text.includes("budget")) {
    return "Pricing depends on the edit complexity, duration, and revision count. A short social edit may start around ₹8,000, while larger commercial or brand work can go much higher.";
  }

  if (text.includes("service") || text.includes("services") || text.includes("what do you do")) {
    return "I create brand films, commercial edits, social reels, and cinematic storytelling visuals tailored for attention-grabbing digital content.";
  }

  if (text.includes("portfolio") || text.includes("work")) {
    return "The portfolio includes brand films, commercials, social edits, and motion-led storytelling work designed to feel premium and engaging.";
  }

  return "I can help with pricing, editing ideas, short-form content strategy, or portfolio questions. If you want, I can also suggest a concept for your next reel or brand film.";
};

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const model = process.env.OLLAMA_MODEL || "llama3.2";

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: `You are a helpful AI assistant for a video editor portfolio website. Answer in a concise, polished way. User question: ${message}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Ollama not available");
      }

      const data = await response.json();

      return res.json({
        success: true,
        reply: data?.response || fallbackReply(message),
      });
    } catch (ollamaError) {
      console.warn("Ollama unavailable, using fallback reply:", ollamaError.message);

      return res.json({
        success: true,
        reply: fallbackReply(message),
      });
    }
  } catch (error) {
    console.error("Chat endpoint error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
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