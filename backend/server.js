const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/postRouter");
const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.end("Bienvenido al proyecto de los impares");
});

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
