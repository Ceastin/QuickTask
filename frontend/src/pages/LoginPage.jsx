import React, { useState } from "react";
import "./LoginPage.css";
import { loginUser } from "../api/userApi";
import {useNavigate}  from "react-router-dom";
export default function LoginPage() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlesubmit=async (e)=>{
    e.preventDefault();
    console.log(formData);
    try{
      setLoading(true);
      setError(null);
      const data = await loginUser(formData);
      console.log("Full response:", data);
      if(data.token) localStorage.setItem("JWT", data.token);
      if(data.name) localStorage.setItem("name", data.name);
      if(data.userId) localStorage.setItem("userId",data.userId)
      navigate("/home", { replace: true });

    }
    catch{
        setError(err.response?.data?.message||"Login failed");
    }
    finally{
        setLoading(false);
    }
  }
  return (
    <div className="login-container">
      {/* Ambient Background Lighting */}
      <div className="ambient-light">
        <div className="blob purple"></div>
        <div className="blob blue"></div>
      </div>

      <div className="login-card">
        <div className="card-header">
          <div className="logo-icon">⚡</div>
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your workspace.</p>
        </div>

        <form className="login-form" onSubmit={handlesubmit}>
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
            <div className="label-row">
              <label>Password</label>
              <a href="/forgot-password" class="forgot-link">Forgot?</a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-glow full-width">
            {loading?"Running()":"Log In"}
          </button>
        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-login">
          <button className="btn-social">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            Google
          </button>
          <button className="btn-social">
            <img src="https://www.svgrepo.com/show/448224/github.svg" alt="GitHub" width="20" className="invert" />
            GitHub
          </button>
        </div>

        <div className="card-footer">
          <p>
            Don't have an account? <a href="/Registration" className="link-highlight">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}