export const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="sidebar">
    <div className="logo-container">
      <span className="logo-icon">⚡</span>
      <h2>QuickTask</h2>
    </div>
    <nav className="nav-links">
      {['Dashboard', 'My Tasks', 'Analytics', 'Logout'].map((item) => (
        <button 
          key={item} 
          className={`nav-item ${activeTab === item ? 'active' : ''}`}
          onClick={() => setActiveTab(item)}
        >
          {item}
        </button>
      ))}
    </nav>
    <div className="user-profile">
      <div className="avatar">A</div>
      <div className="user-info">
        <p className="name">{localStorage.getItem('name')}</p>
      </div>
    </div>
  </aside>
);