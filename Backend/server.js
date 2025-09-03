import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import chatRoute from "./routes/chat.js";
import selectionRoute from "./routes/selectVoice.js";

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/chat", chatRoute);
app.use("/avatar", selectionRoute);

app.listen(port, () => {
  console.log("server working");
});
