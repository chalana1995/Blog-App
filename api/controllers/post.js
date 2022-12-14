import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const q =
    "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);

    res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {};
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "jwrtfcddk", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post");

      return res.status(200).json("post has been deleted");
    });
  });
};
export const updatePost = (req, res) => {};
