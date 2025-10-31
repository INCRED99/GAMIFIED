import express from "express";
import {
  getUser,
  updateUser,
  loginUser,
  deleteUser,
  registerUser,
  getProfile,
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  displayUsers,
  updateProfileImage,

  
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();



import { upload } from "../middleware/upload.js";



router.post("/profile-image",protect, upload.single("image"), updateProfileImage);






// ================== AUTH ==================
router.post("/user/login", loginUser);
router.post("/user/register", registerUser);

// ================== USER CRUD ==================
router.get("/user/get", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
// ================== PROFILE ==================
router.get("/user/profile", protect, getProfile);

// ================== FRIEND SYSTEM ==================
router.get("/user/getfriends", protect, getFriends);

// Send friend request (recipientId in :id)
router.post("/user/request/:id", protect, sendFriendRequest);

// Accept request (requestId in :id)
router.put("/user/accept/:id", protect, acceptFriendRequest);

// Decline request (requestId in :id)
router.put("/user/decline/:id", protect, declineFriendRequest);

// Display all users except current
router.get("/user/displayUser", protect, displayUsers);



export default router;
