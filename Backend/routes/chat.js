import express from "express";
import OpenAI from "openai";
import { system_prompt, system_prompt_two } from "../utils/system_prompt.js";

const chatRoute = express.Router();
const client = new OpenAI();

let messages = [
  {
    role: "system",
    content: `${system_prompt}`,
  },
];

chatRoute.post("/start", async (req, res) => {
  const messages = req.body;

  const { conversation } = messages;

  console.log(conversation);
  if (!messages || messages.length === 0) {
    res.status(400).json({
      success: false,
      message: "Bad request,please check the console",
    });
  }
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversation,
    });

    console.log(completion);

    if (!completion) {
      throw new Error("Failed to make the api call");
    }

    res.status(200).send({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      messages: error.message,
    });
  }
});

export default chatRoute;
