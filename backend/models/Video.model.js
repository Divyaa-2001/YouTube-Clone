import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  channelName: String,
  views: Number,
  category: String,
likes: { type: [String], default: [] },
dislikes: { type: [String], default: [] },
}, { timestamps: true });


export default mongoose.model("Video", videoSchema);
