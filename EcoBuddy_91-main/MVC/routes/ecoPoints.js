import express from "express";
import { addEcoPoints, deductEcoPoints, getLeaderboard } from "../services/ecoPointsService.js";
import { ecoRules } from "../config/ecoRules.js";

const router = express.Router();

// Add points
router.post("/add", async (req, res) => {
  try {
    const { userId, points, reason } = req.body;
    const result = await addEcoPoints(userId, points, reason);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deduct points
router.post("/deduct", async (req, res) => {
  try {
    const { userId, points, reason } = req.body;
    const result = await deductEcoPoints(userId, points, reason);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard(20);
    res.json(leaderboard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Action-based points
router.post("/action", async (req, res) => {
  try {
    const { userId, action } = req.body;

    if (!ecoRules[action]) {
      return res.status(400).json({ error: "Invalid action" });
    }

    const { points, reason } = ecoRules[action];
    const result = await addEcoPoints(userId, points, reason);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
