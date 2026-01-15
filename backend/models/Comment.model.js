import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  videoId: String,
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Comment", commentSchema);
