import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import ecoPoints from "./routes/ecoPoints.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS config
const allowedOrigins = ["http://localhost:8080", "http://localhost:8081"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json()); // ✅ parses JSON bodies
app.use(express.urlencoded({ extended: true })); // ✅ parses form data

// ✅ Connect DB
connectDB();

import path from "path";
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/uploads", express.static("uploads")); //
// ✅ Routes
app.use("/api/question", questionRoutes);
app.use("/api", UserRoutes);
app.use("/api/ecopoints", ecoPoints);
app.use("/challenge", challengeRoutes);
app.use("/api/quiz", questionRoutes);
app.use("/api/chatbot", chatbotRoutes);
import collectionRoutes from "./routes/collectionRoutes.js";

app.use("/api/collection", collectionRoutes);

app.listen(port, () => {
  console.log(`User app listening on port ${port}`);
});
