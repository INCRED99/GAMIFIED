// // /pages/api/chatbot.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { message } = req.body;
//   if (!message) return res.status(400).json({ error: "No message provided" });

//   try {
//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
//       {
//         model: "gemini-2.5-flash", // make sure this model exists in your account
//         messages: [{ role: "user", content: message }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const botReply = response.data?.choices?.[0]?.message?.content || "No response";
//     res.status(200).json({ reply: botReply });
//   } catch (err: any) {
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ error: "Could not fetch response from Gemini" });
//   }
// }
