import React, { useState, useEffect } from "react";
import axios from "axios";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cat]);
  return (
    <div className="menu">
      <h1>Other post you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
