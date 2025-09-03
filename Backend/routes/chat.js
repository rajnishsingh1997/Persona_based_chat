import express from "express";
import OpenAI from "openai";
import {system_prompt,system_prompt_two} from "../utils/system_prompt.js";

const chatRoute = express.Router();
const client = new OpenAI();

let messages = [
  {
    role: "system",
    content: `${system_prompt}`,
  },
];

chatRoute.post("/start", async (req, res) => {
  const { query } = req?.body;
  if (!query || query === "undefined") {
    return res.status(400).json({ error: "Message field is required" });
  }
  const formattedUserQuery = query.trim().toLowerCase();

  messages.push({ role: "user", content: formattedUserQuery });
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    if (!completion) {
      throw new Error("Failed to make the api call");
    }

    messages.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });
    console.log(messages);
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
