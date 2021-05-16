import express from "express";
import Entry from "../models/entries.js";
import authcoord from "../middlewares/authCoord.js";
import auth from "../middlewares/auth.js";
import User from "../models/user.js";

const router = new express.Router();

router.get("/allentries", auth, async (req, res) => {
  try {
    if (!req.query.section) {
      const entries = await Entry.find({});
      return res.send(entries);
    }
    const section = req.query.section;
    const entries = await Entry.find({ section });
    res.send(entries);
  } catch (e) {
    res.send({
      status: 500,
      error: "Something went wrong!",
    });
  }
});

router.get("/leaderboard", authcoord, async (req, res) => {
  try {
    const entries = await Entry.find({})
    const paintingCount = entries.filter(({ section }) => section === 'Painting').length
    const photographyCount = entries.filter(({ section }) => section === 'Photography').length
    const othersCount = entries.filter(({ section }) => section === 'Calligraphy').length
    const independenceCount = entries.filter(({ section }) => section === 'Independence').length
    return res.send({
      entries,
      paintingCount,
      photographyCount,
      othersCount,
      independenceCount
    });
  } catch (e) {
    res.send({
      status: 500,
      error: "Something went wrong!",
    });
  }
});

export default router;
