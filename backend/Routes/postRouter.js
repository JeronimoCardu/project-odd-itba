const express = require("express");
const fs = require("fs/promises");
const postRouter = express.Router();
const path = require("path");

const pathFile = path.join(__dirname, "../posts.json");

const readFile = async (file) => {
  const data = await fs.readFile(file, "utf-8");
  const posts = await JSON.parse(data);
  return posts;
};

const writeFile = async (file, newValue) => {
  await fs.writeFile(file, JSON.stringify(newValue, null, 2));
  return;
};

postRouter.get("/", async (req, res) => {
  res.json(await readFile(pathFile));
});

postRouter.post("/", async (req, res) => {
  const posts = await readFile(pathFile);

  const newPost = req.body;
  posts.push(newPost);

  await writeFile(pathFile, posts);
  res.json(newPost);
});

postRouter.post("/:id/comments", async (req, res) => {
  const posts = await readFile(pathFile);

  const { id } = req.params;
  const newComment = req.body;

  const updatedPosts = posts.map((post) => {
    if (post.id === Number(id)) {
      if (!post.comments) post.comments = [];
      post.comments.push(newComment);
    }
    return post;
  });

  await writeFile(pathFile, updatedPosts);
  res.json(newComment);
});

module.exports = postRouter ;
