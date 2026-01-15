import express from "express";
import {
  createVideo,
  getVideos,
  searchVideos,
  filterVideos,
  getUserVideos,
  deleteVideo,
  updateVideo,
  likeVideo,
  dislikeVideo
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/videos", createVideo);
router.get("/videos", getVideos);
router.get("/videos/search/:query", searchVideos);
router.get("/videos/category/:category", filterVideos);
router.get("/videos/user/:username", getUserVideos);
router.delete("/videos/:id", deleteVideo);
router.put("/videos/:id", updateVideo);
router.put("/videos/:id/like", likeVideo);
router.put("/videos/:id/dislike", dislikeVideo);

export default router;
