import Video from "../models/Video.model.js";

// CREATE video
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Error creating video" });
  }
};

// GET all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos" });
  }
};

// SEARCH by title
export const searchVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      title: { $regex: req.params.query, $options: "i" }
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Search error" });
  }
};

// FILTER by category
export const filterVideos = async (req, res) => {
  try {
    const videos = await Video.find({ category: req.params.category });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Filter error" });
  }
};
