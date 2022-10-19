import React, { useState, useEffect, useContext } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} />
        <div className="user">
          {post.userImg && <img src={post.userImg} />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username == post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`}>
                <img src={Edit} />
              </Link>
              <img src={Delete} onClick={handleDelete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
