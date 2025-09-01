import express from "express";
import OpenAI from 'openai';

const chatRoute = express.Router();
const client = new OpenAI();

chatRoute.post("/start", (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Message field is required" });
  }
  const formattedUserQuery = query.trim().toLowerCase();

  res.status(200).send({
    success: true,
    message: formattedUserQuery,
  });


});

export default chatRoute;
