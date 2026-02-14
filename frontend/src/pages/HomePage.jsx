import React, { useState } from "react";
import "./HomePage.css";
import { Sidebar } from "../Components/Sidebar";
import { CreateTaskModal } from "../Components/CreateTaskModal";
import { StatsOverview } from "../Components/StatsOverview";
import { TaskCard } from "../Components/TaskCard";
import { TaskFilters } from "../Components/TaskOverview";
import { useEffect } from "react";
import { getAllUsers,addTask,modifyTask,deleteTasky } from "../api/task";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate=useNavigate();
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [sort, setSort] = useState('Newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchagain,setFetchAgain]=useState(true);
  useEffect(()=>{
    const fetchAllTask=async()=>{
      try{
        const data =await getAllUsers();
        setTasks(data);
      }
      catch(err)
      {
        setError("Failed to load tasks");
      }
    };
    fetchAllTask();
  },[fetchagain]);
  const filteredTasks = tasks.filter(task => {
    if (filter === "Pending") return task.status !== "Completed";
    if (filter === "Completed") return task.status === "Completed";
    return true; // All
  }).filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "Priority") {
      const order = { High: 3, Medium: 2, Low: 1 };
      return (order[b.priority] || 0) - (order[a.priority] || 0);
    }
    return 0;
  });

if (activeTab === "Logout") {
  localStorage.removeItem("JWT");
  navigate("/login"); 
}



  // Handlers
const toggleTask = async (id) => {
  const task = tasks.find(t => t._id === id);

  if (!task) return;

  const updatedStatus =
    task.status === "Completed" ? "Todo" : "Completed";

  const updatedTask = { ...task, status: updatedStatus };

  await modifyTask(id, updatedTask);

  setTasks(prevTasks =>
    prevTasks.map(t =>
      t._id === id ? updatedTask : t
    )
  );
};

  const addAnotherTask=async (data)=>{
    try{
      console.log(data);
      await addTask(data);
      setFetchAgain(prev => !prev);
    }
    catch(err)
    {
      console.log(err);
    }
  }



  const deleteTask = async(id) => {
  await deleteTasky(id);
  setTasks(tasks.filter(t => t._id !== id));
};



  return (
  <div className="dashboard-container">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

    {/* The main-content class handles the scrolling and padding for BOTH tabs */}
    <main className="main-content">
      
      {/* ---------------- DASHBOARD TAB ---------------- */}
      {activeTab === "Dashboard" && (
        <>
          <header className="top-header">
            <div className="header-text">
              <h1>Hello, {localStorage.username || 'User'}!</h1>
              <p>Here's what's happening today.</p>
            </div>
            <button className="btn-glow" onClick={() => setIsModalOpen(true)}>+ New Task</button>
          </header>

          <StatsOverview tasks={tasks} />

          <div className="content-area">
            <TaskFilters
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery} 
            />
            <div className="tasks-list">
              {sortedTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
              {filteredTasks.length === 0 && (
                <div className="empty-state">
                  <p>No tasks found. Time to relax! ☕</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Modal is strictly for Dashboard actions, keep it here or move outside main if needed globally */}
          <CreateTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={addAnotherTask}
          />
        </>
      )}

      {/* ---------------- MY TASKS TAB ---------------- */}
      {activeTab === "My Tasks" && (
        <div className="my-tasks-container">
          <header className="my-tasks-header">
            <div>
              <h2>My Assignments</h2>
              <p>Stay on top of your personal workload.</p>
            </div>
            <div className="task-count-badge">
              {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
            </div>
          </header>

          {tasks.length === 0 ? (
            <div className="empty-state-large">
              <span className="empty-icon">☕</span>
              <h3>All caught up!</h3>
              <p>No tasks assigned to you right now.</p>
            </div>
          ) : (
            <div className="my-tasks-grid">
              {tasks.map(task => (
                <div key={task._id} className="task-grid-card">
                  <div className="card-top">
                    <span className={`priority-pill ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <span className={`status-dot ${task.status === 'Completed' ? 'completed' : 'pending'}`}></span>
                  </div>

                  <h3 className="grid-task-title">{task.title}</h3>

                  <p className="grid-task-desc">
                    {task.description
                      ? (task.description.length > 80 ? task.description.substring(0, 80) + "..." : task.description)
                      : "No description provided."}
                  </p>

                  <div className="card-footer">
                    <div className="due-date-group">
                      <span className="label">Due Date</span>
                      <span className="date-value">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="status-badge">
                      {task.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  </div>
);
}