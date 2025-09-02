import express from "express";
import OpenAI from "openai";

const chatRoute = express.Router();
const client = new OpenAI();

let messages = [
  {
    role: "system",
    content: `you are a ai chatbot designed to answer javascript question}`,
  },
];

chatRoute.post("/start", async (req, res) => {
  const { query } = req?.body;
  if (!query || query === "undefined") {
    return res.status(400).json({ error: "Message field is required" });
  }
  const formattedUserQuery = query.trim().toLowerCase();

  messages.push({ role: "user", content: formattedUserQuery });

  // let newMessages = [
  //   ...messages,
  //   { role: "user", content: formattedUserQuery },
  // ];

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
