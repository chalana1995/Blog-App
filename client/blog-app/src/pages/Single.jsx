import React, { useState, useEffect, useContext } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} />
        <div className="user">
          <img src="data:image/png;base64,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" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username == post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`}>
                <img src={Edit} />
              </Link>
              <img src={Delete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
