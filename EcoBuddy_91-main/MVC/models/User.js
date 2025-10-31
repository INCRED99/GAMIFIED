import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["student", "teacher", "admin"], required: true },
  schoolCode: { type: String, required: true },
  studentId: { type: String },
  teacherId: { type: String },
  adminId: { type: String },
  EcoPoints: { type: Number, default: 0 },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  solvedList: [{ type: Number }],

  // ✅ New fields
  lastLogin: { type: Date },
  streak: { type: Number, default: 0 },
  lastRewardClaimed: { type: Date },
  picture: { type: String, default: "" } // profile picture URL or base64
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
