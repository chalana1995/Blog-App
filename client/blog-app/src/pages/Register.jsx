import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.taget.value }));
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          name="username"
          value={input.username}
          onChange={handleInputs}
          placeholder="username"
        />
        <input
          required
          type="email"
          name="email"
          value={input.email}
          onChange={handleInputs}
          placeholder="email"
        />
        <input
          required
          type="password"
          name="password"
          value={input.password}
          onChange={handleInputs}
          placeholder="password"
        />
        <button>Register</button>
        <p>This is an Error</p>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
