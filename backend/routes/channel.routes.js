// import express from "express";
// import Channel from "../models/Channel.model.js";

// const router = express.Router();

// // Create channel
// router.post("/", async (req, res) => {
//   const channel = await Channel.create(req.body);
//   res.json(channel);
// });

// // Get channel
// router.get("/:owner", async (req, res) => {
//   const channel = await Channel.findOne({ owner: req.params.owner });
//   res.json(channel);
// });

// export default router;


import express from "express";
import Channel from "../models/Channel.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const channel = await Channel.create(req.body);
  res.json(channel);
});

router.get("/:owner", async (req, res) => {
  const channel = await Channel.findOne({ owner: req.params.owner });
  res.json(channel);
});

export default router;
