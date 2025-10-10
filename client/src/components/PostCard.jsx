import { useState } from "react";
import CreatorComment from "./CreatorComment";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <article>
        <div>
          <h1>{post.title}</h1>
          <blockquote>
            <p>{post.createdAt}</p> - <cite>{post.author}</cite>
          </blockquote>
        </div>
        <p>{post.content}</p>
        <button onClick={() => setShowComments(!showComments)}>
          Show comments
        </button>
        {showComments && (
          <section>
            {post.comments.map((comment) => (
              <article key={comment.id}>
                <blockquote>
                  <p>{comment.createdAt}</p> - <cite>{comment.author}</cite>
                </blockquote>
                <p>{comment.content}</p>
              </article>
            ))}
          </section>
        )}
        <section>
          <CreatorComment postID={post.id} />
        </section>
      </article>
    </>
  );
}
