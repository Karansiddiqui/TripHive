import React, { useState } from "react";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Extract error message from response
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const loggedIn = await response.json();

      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log("Login failed", err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
