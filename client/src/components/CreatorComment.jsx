import { useState } from "react";

export default function CreatorComment({ postID }) {
  const [newComment, setNewComment] = useState({
    author: "",
    content: "",
  });
  const [isIncomplete, setIsIncomplete] = useState(false);
  async function createComment(comment) {
    if (comment.author && comment.content) {
      await fetch(`http://localhost:4000/api/posts/${postID}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      setIsIncomplete(false);
      setNewComment({
        author: "",
        content: "",
      });
    } else {
      setIsIncomplete(true);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createComment(newComment);
      }}
    >
      <input
        value={newComment.author}
        onChange={(e) =>
          setNewComment({ ...newComment, author: e.currentTarget.value })
        }
        type="text"
        placeholder="author"
      />
      <textarea
        value={newComment.content}
        onChange={(e) =>
          setNewComment({ ...newComment, content: e.currentTarget.value })
        }
        placeholder="content"
        name=""
        id=""
      />
      <button type="sumbit">Public Comment</button>
      {((!newComment.content || !newComment.author) && isIncomplete) && 
        <p style={{ color: "red", textAlign: "center", margin: "0  " }}>
          Requied all fields
        </p>
      }
    </form>
  );
}
