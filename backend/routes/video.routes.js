import express from "express";
import {
  createVideo,
  getVideos,
  searchVideos,
  filterVideos
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/videos", createVideo);
router.get("/videos", getVideos);
router.get("/videos/search/:query", searchVideos);
router.get("/videos/category/:category", filterVideos);

export default router;
