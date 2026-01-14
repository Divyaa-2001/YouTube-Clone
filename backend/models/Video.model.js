import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  channelName: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  category: String,
  uploadDate: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

export default mongoose.model("Video", videoSchema);
