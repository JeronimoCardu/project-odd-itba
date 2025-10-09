const express = require("express");
const fs = require("fs/promises");
const postRouter = express.Router();
const path = require("path");
const crypto = require("crypto");

const pathFile = path.join(__dirname, "../posts.json");

// postRouter.use(express.json());

const readFile = async (file) => {
  const data = await fs.readFile(file, "utf-8");
  return JSON.parse(data);
};

const writeFile = async (file, newValue) => {
  await fs.writeFile(file, JSON.stringify(newValue, null, 2));
};

postRouter.get("/", async (req, res) => {
  res.json(await readFile(pathFile));
});

postRouter.post("/", async (req, res) => {
  const posts = await readFile(pathFile);
  const newPost = req.body;

  if (!newPost.title || !newPost.content || !newPost.author) {
    return res.status(400).json("Requied all fields");
  }

  const postToSave = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...newPost,
    comments: [],
  };
  posts.push(postToSave);

  await writeFile(pathFile, posts);
  res.json(postToSave);
});

postRouter.post("/:id/comments", async (req, res) => {
  const posts = await readFile(pathFile);

  const { id } = req.params;
  const newComment = req.body;

  const updatedPosts = posts.map((post) => {
    if (post.id === id) {
      post.comments.push({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...newComment,
      });
    }
    return post;
  });

  await writeFile(pathFile, updatedPosts);
  res.json(newComment);
});

module.exports = postRouter;
