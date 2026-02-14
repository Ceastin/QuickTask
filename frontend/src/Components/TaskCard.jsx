export const TaskCard = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.status === "Completed";

  return (
    <div className={`task-card glass-panel ${isCompleted ? 'completed' : ''}`}>
      <div className="task-left">
        <div
          className={`checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggle(task._id)}
        >
          {isCompleted && '✓'}
        </div>

        <div className="task-details">
          <h4>{task.title}</h4>
          <p>
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="task-right">
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <button
          className="btn-icon delete"
          onClick={() => onDelete(task._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
