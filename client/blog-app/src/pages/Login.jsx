import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });

  const [err, serErr] = useState(null);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await login(inputs);
    navigate("/");
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="username"
        />
        <input
          required
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <button onClick={handleClick}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
