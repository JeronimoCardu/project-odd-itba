import { useState } from "react";

export default function CreatorPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [send, setSend] = useState(false);

  async function createPost(newPost) {
    try {
      await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <aside>
      <h2>Create Post</h2>
      <p>Complete this form to create a post</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSend(true);
          createPost({ title, content, author });
        }}
      >
        <input
          onChange={(e) => setAuthor(e.currentTarget.value)}
          type="text"
          placeholder="Author"
        />
        <input
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          placeholder="Title"
        />
        <input
          onChange={(e) => setContent(e.currentTarget.value)}
          type="text"
          placeholder="Content"
        />
        <button type="submit">Create</button>
        {(!title || !content || !author) && send && (
          <p style={{ color: "red", textAlign: "center", margin: "0  " }}>
            Fileds are empty
          </p>
        )}
      </form>
    </aside>
  );
}
