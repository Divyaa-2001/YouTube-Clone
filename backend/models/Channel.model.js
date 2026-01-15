import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: String,
  owner: String,
  description: String,
  banner: String
});

export default mongoose.model("Channel", channelSchema);
