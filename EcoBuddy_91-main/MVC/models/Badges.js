import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, // emoji or image URL
  awardedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const BadgeModel = mongoose.model("Badge", badgeSchema);

export default BadgeModel;
