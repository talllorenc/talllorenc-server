const express = require("express");
const Beat = require("../models/beat");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.post("/add_beat", async (req, res) => {
  try {
    const { title, bpm, tags, photoUrl, audio } = req.body;
    const beat = new Beat({ title, bpm, tags, photoUrl, audio });
    await beat.save();

    res.status(201).json({ message: "Пост успешно создан" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

/**********************************BEAT IMG UPLOAD*******************************************/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/beats/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload_beat_img", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Файл не был загружен" });
  }

  const baseUrl = "http://localhost:8080";
  const imagePath = `uploads/beats/${req.file.filename}`;
  const imageUrl = `${baseUrl}/${imagePath}`;

  res.json({
    success: 1,
    file: {
      url: imageUrl,
    },
  });
});

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audio/"); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadAudio = multer({ storage: audioStorage });

router.post("/upload_audio", uploadAudio.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Файл не был загружен" });
  }

  const baseUrl = "http://localhost:8080";
  const audioPath = `/uploads/audio/${req.file.filename}`;
  const audioUrl = `${audioPath}`;

  res.json({
    success: 1,
    file: {
      url: audioUrl,
    },
  });
});

module.exports = router;
