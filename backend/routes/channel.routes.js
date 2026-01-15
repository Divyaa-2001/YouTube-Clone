import express from "express";
import Channel from "../models/Channel.model.js";

const router = express.Router();

// Create Channel
router.post("/", async (req, res) => {
  const channel = await Channel.create(req.body);
  res.json(channel);
});

// Get Channel by username
router.get("/:username", async (req, res) => {
  const channel = await Channel.findOne({ owner: req.params.username });
  res.json(channel);
});

export default router;
