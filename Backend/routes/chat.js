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
  if (!messages || messages.length === 0) {
    res.status(400).json({
      success: false,
      message: "Bad request,please check the console",
    });
  }
  try {
    
  } catch (error) {
    res.status(400).json({
      status: false,
      messages: error.message,
    });
  }
});

export default chatRoute;
