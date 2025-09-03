import express from "express";
const selectionRoute = express.Router();

selectionRoute.post("/selectAvatar", (req, res) => {
  const { avatar } = req.body;
  if (!avatar || avatar === "undefined") {
    res.status(400).json({
      error: "please select the avatar",
    });
  }
  res.status(200).send({
    success: true,
    message: avatar,
  });
});
export default selectionRoute;
