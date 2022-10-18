import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

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
  }, []);

  return (
    <div className="home">
      <div className="posts">
        {posts &&
          posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="img">
                  <img src={post.img} alt="" />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{post.desc}</p>
                  <button>Read More</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
