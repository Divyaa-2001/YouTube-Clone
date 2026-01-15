// import express from "express";
// import Comment from "../models/Comment.model.js";

// const router = express.Router();

// // Add comment
// router.post("/", async (req, res) => {
//   const comment = await Comment.create(req.body);
//   res.json(comment);
// });

// // Get comments by video
// router.get("/:videoId", async (req, res) => {
//   const comments = await Comment.find({ videoId: req.params.videoId });
//   res.json(comments);
// });

// // Delete comment
// router.delete("/:id", async (req, res) => {
//   await Comment.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// // Edit comment
// router.put("/comments/:id", async (req, res) => {
//   const updated = await Comment.findByIdAndUpdate(
//     req.params.id,
//     { text: req.body.text },
//     { new: true }
//   );
//   res.json(updated);
// });

// // Delete comment
// router.delete("/comments/:id", async (req, res) => {
//   await Comment.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });


// export default router;

import express from "express";
import Comment from "../models/Comment.model.js";

const router = express.Router();

// Add comment
router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

// Get comments by video
router.get("/:videoId", async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
});

// Edit comment (FIXED)
router.put("/:id", async (req, res) => {
  const updated = await Comment.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.json(updated);
});

// Delete comment (FIXED)
router.delete("/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;

