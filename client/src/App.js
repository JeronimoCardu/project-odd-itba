import "./App.css";
import { useEffect, useState } from "react";
import CreatorPost from "./sections/CreatorPost";
import PostCard from "./components/PostCard";

export default function App() {
  const [posts, setPosts] = useState([]);
  async function getPosts() {
    try {
      const postsData = await fetch("http://localhost:4000/api/posts");
      const arrayPosts = await postsData.json();
      setPosts(arrayPosts);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPosts();
  }, [posts]);
  return (
    <>
      <header>
        <h1>My Blog</h1>
      </header>
      <main>
        <CreatorPost />
        <section>
          {posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </section>
      </main>
    </>
  );
}
