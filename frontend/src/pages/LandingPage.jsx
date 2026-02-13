import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const navigate=useNavigate();
  return (
    <div className="app-container">
      {/* Ambient Background Lighting (Updated to Warm Tones) */}
      <div className="ambient-light">
        <div className="blob orange"></div>
        <div className="blob yellow"></div>
      </div>

      <nav className="navbar">
        <div className="logo-container">
          <div className="logo-icon">⚡</div>
          <h1 className="logo">QuickTask</h1>
        </div>
        <div className="nav-buttons">
          <button className="btn-link" onClick={()=>navigate("/Login")}>Login</button>
          <button className="btn-primary" onClick={()=>navigate("/Registration")}>Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="badge">✨ Now Live</span>
          <h2>
            Organize Your Day. <br />
            <span className="text-highlight">Master Your Workflow.</span>
          </h2>
          <p>
            QuickTask helps you manage daily tasks efficiently with smart tracking,
            AI-powered suggestions, and insightful analytics.
          </p>
          <div className="cta-group">
            <button className="btn-primary large" onClick={()=>navigate("/Login")}>Start Managing Tasks</button>
            <button className="btn-outline large">View Demo</button>
          </div>
        </div>

        {/* Floating Visuals (Now Light & Clean) */}
        <div className="hero-visuals">
          <div className="floating-card card-1">
            <span className="icon">📊</span>
            <div className="lines">
              <div className="line full"></div>
              <div className="line half"></div>
            </div>
          </div>
          <div className="floating-card card-2">
            <span className="icon">✅</span>
            <div className="lines">
              <div className="line full"></div>
            </div>
          </div>
          <div className="floating-card card-3">
            <span className="icon">⏰</span>
            <div className="lines">
              <div className="line full"></div>
              <div className="line three-q"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why QuickTask?</h2>
        <div className="cards-container">
          <div className="feature-card">
            <div className="card-icon">📂</div>
            <h3>Task Management</h3>
            <p>Create, edit, delete and categorize tasks easily with a fluid interface.</p>
          </div>
          <div className="feature-card highlight">
            <div className="card-icon">📈</div>
            <h3>Progress Analytics</h3>
            <p>Visualize your productivity with stunning charts and smart insights.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">🔔</div>
            <h3>Smart Reminders</h3>
            <p>Never miss a deadline with timely notifications and alerts.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 QuickTask. Designed for clarity.</p>
      </footer>
    </div>
  );
}