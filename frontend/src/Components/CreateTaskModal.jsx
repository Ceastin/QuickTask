
import { useState } from "react";

export const CreateTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority:"Low",
    dueDate: "",
  });
  const handlechange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2>New Task</h2>
        <input name="title" value={formData.title} onChange={handlechange} type="text" placeholder="Task Title" className="modal-input" />
        <input name="description" value={formData.description} onChange={handlechange} type="text" placeholder="Description...." className="modal-input" />
        <div className="modal-row">
          <select name="priority" value={formData.priority} onChange={handlechange} className="modal-input"><option value="High">High</option><option value="Medium">Medium</option><option  value="Low">Low</option></select>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handlechange} className="modal-input" />
        </div>
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-glow" onClick={() => { onAdd(formData); onClose(); }}>Create Task</button>
        </div>
      </div>
    </div>
  );
};