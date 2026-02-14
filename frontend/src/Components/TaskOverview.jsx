export const TaskFilters = ({ filter, setFilter, sort, setSort, searchQuery, setSearchQuery }) => (
  <div className="filters-bar glass-panel">
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search tasks..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <div className="controls">
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="dropdown">
        <option value="All">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="dropdown">
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
        <option value="Priority">Priority</option>
      </select>
    </div>
  </div>
);
