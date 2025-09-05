import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import chatRoute from "./routes/chat.js";

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/chat", chatRoute);

app.get('/', (req, res) => {
  res.send('Backend is live!');
});

app.listen(port, () => {
  console.log("server working");
});
