import React, { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      {/* Subtle Warm Background Accents */}
      <div className="ambient-light">
        <div className="blob orange"></div>
        <div className="blob yellow"></div>
      </div>

      <div className="register-card">
        <div className="card-header">
          <div className="logo-icon">⚡</div>
          <h2>Create Account</h2>
          <p>Join QuickTask and boost your productivity.</p>
        </div>

        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary full-width">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <span>Or register with</span>
        </div>

        <div className="social-login">
          <button className="btn-social">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            Google
          </button>
          <button className="btn-social">
            <img src="https://www.svgrepo.com/show/448224/github.svg" alt="GitHub" width="20" />
            GitHub
          </button>
        </div>

        <div className="card-footer">
          <p>
            Already have an account? <a href="/login" className="link-highlight">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}