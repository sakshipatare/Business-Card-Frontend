import React, { useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("Remember me:", remember);
    // Add your login logic here

    try {
    const response = await fetch("http://localhost:4000/users/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("Login API response:", data);

    if (response.ok) {
      alert("Login successful!");

      // ✅ Save user data to localStorage
      localStorage.setItem("userData", JSON.stringify(data.user));
      
      // Save token or user info if needed: localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.message || "Login failed. Please check credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }

  };

  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="welcome-text">Welcome Back</h2>
        <p className="signin-text">Sign in to access your digital business card</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <div className="options">
            <label>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>Remember me</label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="signin-button">Sign In</button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/auth/signup">Create now</Link>
        </p>

        <div className="demo-section">
          <p>Demo credentials for testing:</p>
          <p>Email: any@email.com | Password: any password</p>
        </div>
      </div>
    </div>
  );
}
