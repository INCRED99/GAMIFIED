import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// POST chatbot query
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini", // or "gpt-4.1"
        messages: [
          {
            role: "system",
            content:
              "You are EcoBot 🌱, an AI assistant that answers questions about environment, climate change, sustainability, and eco-education. Keep responses friendly, concise, and educational.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data); // 👈 debug log

    const reply =
      data.choices?.[0]?.message?.content ||
      "⚠️ EcoBot couldn't generate a reply.";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
