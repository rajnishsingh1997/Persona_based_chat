import express from "express";
import OpenAI from "openai";

const chatRoute = express.Router();
const client = new OpenAI();

chatRoute.post("/start", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Message field is required" });
  }
  const formattedUserQuery = query.trim().toLowerCase();
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: formattedUserQuery,
        },
      ],
    });

    if (!completion) {
      throw new Error("Failed to make the api call");
    }

    res.status(200).send({
      success: true,
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
});

export default chatRoute;
