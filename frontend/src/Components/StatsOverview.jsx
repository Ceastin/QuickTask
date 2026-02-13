export const StatsOverview = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-grid">
      <div className="stat-card glass-panel">
        <div className="stat-icon purple">📝</div>
        <div className="stat-info">
          <h3>Total Tasks</h3>
          <p className="stat-value">{total}</p>
        </div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-icon blue">✅</div>
        <div className="stat-info">
          <h3>Completed</h3>
          <p className="stat-value">{completed}</p>
        </div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-icon orange">⏳</div>
        <div className="stat-info">
          <h3>Pending</h3>
          <p className="stat-value">{pending}</p>
        </div>
      </div>
      <div className="stat-card glass-panel wide">
        <div className="stat-info">
          <h3>Productivity</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="stat-sub">{progress}% of goals reached</p>
        </div>
      </div>
    </div>
  );
};