


export const CreateTaskModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2>New Task</h2>
        <input type="text" placeholder="Task Title" className="modal-input" />
        <div className="modal-row">
          <select className="modal-input"><option>High</option><option>Medium</option><option>Low</option></select>
          <input type="date" className="modal-input" />
        </div>
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-glow" onClick={() => { onAdd(); onClose(); }}>Create Task</button>
        </div>
      </div>
    </div>
  );
};