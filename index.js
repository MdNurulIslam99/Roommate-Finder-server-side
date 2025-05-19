const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("roomMate server is getting user");
});
app.listen(port, () => {
  console.log("room mate server is running on port : ", port);
});
