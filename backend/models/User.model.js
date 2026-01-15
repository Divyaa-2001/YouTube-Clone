import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

export default mongoose.model("User", userSchema);
