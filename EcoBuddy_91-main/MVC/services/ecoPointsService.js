// services/ecoPointsService.js
import UserModel from "../models/User.js";

// Add EcoPoints
export const addEcoPoints = async (userId, points, reason = "General") => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  user.EcoPoints += points;
  await user.save();

  return {
    success: true,
    message: `+${points} EcoPoints for ${reason}`,
    EcoPoints: user.EcoPoints,
  };
};

// Deduct EcoPoints
export const deductEcoPoints = async (userId, points, reason = "Penalty") => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  user.EcoPoints = Math.max(0, user.EcoPoints - points); // Prevent negative
  await user.save();

  return {
    success: true,
    message: `-${points} EcoPoints for ${reason}`,
    EcoPoints: user.EcoPoints,
  };
};

// Leaderboard
export const getLeaderboard = async (limit = 20) => {
  const users = await UserModel.find()
    .sort({ EcoPoints: -1 })
    .limit(limit)
    .select("name EcoPoints");

  return users;
};
