// src/services/cloudinary.js

const CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// 20 MB chunks
const CHUNK_SIZE = 20 * 1024 * 1024;

console.log("Cloudinary Cloud Name:", CLOUD_NAME);
console.log("Cloudinary Upload Preset:", UPLOAD_PRESET);

export async function uploadVideo(file, onProgress) {
  if (!file) {
    throw new Error("No video selected.");
  }

  if (!CLOUD_NAME) {
    throw new Error(
      "Cloudinary cloud name is missing."
    );
  }

  if (!UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary upload preset is missing."
    );
  }

  if (!file.type.startsWith("video/")) {
    throw new Error(
      "Please select a valid video file."
    );
  }

  // ==========================================================
  // CLOUDINARY URL
  // ==========================================================

  const uploadUrl =
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;

  // ==========================================================
  // UNIQUE UPLOAD ID
  // Used for the entire chunked upload
  // ==========================================================

  const uploadId =
    `${Date.now()}-${crypto.randomUUID()}`;

  // ==========================================================
  // UNIQUE CLOUDINARY PUBLIC ID
  //
  // THIS IS THE IMPORTANT FIX.
  //
  // Every uploaded video gets its own Cloudinary asset.
  // ==========================================================

  const cleanFileName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 80);

  const publicId =
    `snipsync_${cleanFileName}_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;

  const totalSize = file.size;

  let start = 0;
  let finalResponse = null;

  console.log("==============================");
  console.log("Cloudinary chunked upload");
  console.log("==============================");

  console.log("File:", file.name);

  console.log(
    "Size:",
    (totalSize / 1024 / 1024).toFixed(2),
    "MB"
  );

  console.log(
    "Chunk size:",
    (CHUNK_SIZE / 1024 / 1024).toFixed(0),
    "MB"
  );

  console.log("Upload ID:", uploadId);

  console.log("Public ID:", publicId);

  console.log("==============================");

  try {
    while (start < totalSize) {
      const end =
        Math.min(
          start + CHUNK_SIZE,
          totalSize
        ) - 1;

      // ======================================================
      // GET CHUNK
      // ======================================================

      const rawChunk = file.slice(
        start,
        end + 1
      );

      // ======================================================
      // IMPORTANT
      //
      // Convert Blob back into a File.
      //
      // This prevents Cloudinary from seeing:
      //
      //     blob
      //
      // and instead preserves the original filename/type.
      // ======================================================

      const chunk = new File(
        [rawChunk],
        file.name,
        {
          type: file.type,
        }
      );

      // ======================================================
      // FORM DATA
      // ======================================================

      const formData = new FormData();

      formData.append(
        "file",
        chunk,
        file.name
      );

      formData.append(
        "upload_preset",
        UPLOAD_PRESET
      );

      // ======================================================
      // IMPORTANT
      //
      // Every chunk uses the SAME public_id.
      // ======================================================

      formData.append(
        "public_id",
        publicId
      );

      formData.append(
        "resource_type",
        "video"
      );

      const contentRange =
        `bytes ${start}-${end}/${totalSize}`;

      console.log(
        `Uploading chunk: ${start}-${end}/${totalSize}`
      );

      // ======================================================
      // UPLOAD CHUNK
      // ======================================================

      const response = await fetch(
        uploadUrl,
        {
          method: "POST",

          headers: {
            "X-Unique-Upload-Id":
              uploadId,

            "Content-Range":
              contentRange,
          },

          body: formData,
        }
      );

      // ======================================================
      // RESPONSE
      // ======================================================

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      console.log(
        "Chunk response:",
        response.status,
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            `Cloudinary upload failed: ${response.status}`
        );
      }

      // ======================================================
      // PROGRESS
      // ======================================================

      const uploadedBytes =
        end + 1;

      const percentage =
        Math.round(
          (uploadedBytes / totalSize) *
            100
        );

      if (onProgress) {
        onProgress(percentage);
      }

      console.log(
        `Progress: ${percentage}%`
      );

      // ======================================================
      // SAVE RESPONSE
      // ======================================================

      finalResponse = data;

      // ======================================================
      // NEXT CHUNK
      // ======================================================

      start = end + 1;
    }

    // ========================================================
    // VALIDATE FINAL RESPONSE
    // ========================================================

    if (!finalResponse) {
      throw new Error(
        "Cloudinary did not return an upload response."
      );
    }

    console.log("==============================");
    console.log(
      "Cloudinary upload completed"
    );
    console.log("==============================");

    console.log(
      "Secure URL:",
      finalResponse.secure_url
    );

    console.log(
      "Public ID:",
      finalResponse.public_id
    );

    console.log(
      "Format:",
      finalResponse.format
    );

    console.log(
      "Duration:",
      finalResponse.duration
    );

    console.log("==============================");

    if (onProgress) {
      onProgress(100);
    }

    // ========================================================
    // RETURN DATA
    // ========================================================

    return {
      url:
        finalResponse.secure_url,

      secureUrl:
        finalResponse.secure_url,

      publicId:
        finalResponse.public_id,

      duration:
        finalResponse.duration || 0,

      format:
        finalResponse.format || "mp4",

      width:
        finalResponse.width || 0,

      height:
        finalResponse.height || 0,
    };
  } catch (error) {
    console.error(
      "Cloudinary chunked upload error:",
      error
    );

    throw error;
  }
}