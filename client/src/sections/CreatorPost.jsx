import { useState } from "react";

export default function CreatorPost() {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [isIncomplete, setIsIncomplete] = useState(false);

  async function createPost(newPost) {
    try {
      if (newPost.title && newPost.author && newPost.content) {
        await fetch("http://localhost:4000/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        });
        setIsIncomplete(false);
        setNewPost({
          title: "",
          content: "",
          author: "",
        });
      } else {
        setIsIncomplete(true);
      }
    } catch (err) {}
  }

  return (
    <aside>
      <h2>Create Post</h2>
      <p>Complete this form to create a post</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost(newPost);
        }}
      >
        <input
          value={newPost.author}
          onChange={(e) =>
            setNewPost({ ...newPost, author: e.currentTarget.value })
          }
          type="text"
          placeholder="Author"
        />
        <input
          value={newPost.title}
          onChange={(e) =>
            setNewPost({ ...newPost, title: e.currentTarget.value })
          }
          type="text"
          placeholder="Title"
        />
        <textarea
          value={newPost.content}
          onChange={(e) =>
            setNewPost({ ...newPost, content: e.currentTarget.value })
          }
          type="text"
          placeholder="Content"
        />
        <button type="submit">Create</button>
        {(!newPost.title || !newPost.content || !newPost.author) &&
          isIncomplete && (
            <p style={{ color: "red", textAlign: "center", margin: "0  " }}>
              Requied all fields
            </p>
          )}
      </form>
    </aside>
  );
}
