import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { PinataSDK } from "pinata";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// fileFilter: (req, file, cb) => {
//if (file.mimetype === 'application/pdf') {
//   cb(null, true);
//} else {
//   cb(new Error("Only PDF allowed"), false);
//  }
//}

app.use(cors());

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
});

app.get("/", (req, res) => {
  res.json({ message: "Upload server running" });
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = new File(
      [req.file.buffer],
      req.file.originalname,
      { type: req.file.mimetype }
    );

    const uploadResponse = await pinata.upload.public.file(file);

    return res.json({
      success: true,
      cid: uploadResponse.cid,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    console.error("Pinata upload error:", error);
    return res.status(500).json({
      error: "Failed to upload file to Pinata",
      details: error?.message || "Unknown error",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`);
});