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


export const getUserVideos = async (req, res) => {
  const videos = await Video.find({ channelName: req.params.username });
  res.json(videos);
};
export const deleteVideo = async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.json({ message: "Video deleted" });
};

export const updateVideo = async (req, res) => {
  const updated = await Video.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

    export const likeVideo = async (req, res) => {
      const { user } = req.body;

      const video = await Video.findById(req.params.id);

      if (video.likes.includes(user)) {
        video.likes = video.likes.filter(u => u !== user);
      } else {
        video.likes.push(user);
        video.dislikes = video.dislikes.filter(u => u !== user);
      }

      await video.save();
      res.json(video);
    };


export const dislikeVideo = async (req, res) => {
  const { user } = req.body;
  const video = await Video.findById(req.params.id);

  if (!video) return res.status(404).json({ message: "Not found" });

  video.likes = video.likes.filter(u => u !== user);

  if (video.dislikes.includes(user)) {
    video.dislikes = video.dislikes.filter(u => u !== user);
  } else {
    video.dislikes.push(user);
  }

  await video.save();
  res.json(video);
};



