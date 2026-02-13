
export const TaskCard = ({ task, onToggle, onDelete }) => (
  <div className={`task-card glass-panel ${task.completed ? 'completed' : ''}`}>
    <div className="task-left">
      <div 
        className={`checkbox ${task.completed ? 'checked' : ''}`} 
        onClick={() => onToggle(task.id)}
      >
        {task.completed && '✓'}
      </div>
      <div className="task-details">
        <h4>{task.title}</h4>
        <p>📅 {task.date} • <span className={`tag ${task.category.toLowerCase()}`}>{task.category}</span></p>
      </div>
    </div>
    <div className="task-right">
      <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
      <button className="btn-icon delete" onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  </div>
);