import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Sidebar } from "../Components/Sidebar";
import { CreateTaskModal } from "../Components/CreateTaskModal";
import { StatsOverview } from "../Components/StatsOverview";
import { TaskCard } from "../Components/TaskCard";
import { TaskFilters } from "../Components/TaskOverview";
const initialTasks = [
  { id: 1, title: "Design Landing Page", category: "Design", priority: "High", date: "2024-02-20", completed: false },
  { id: 2, title: "Integrate Authentication", category: "Dev", priority: "High", date: "2024-02-21", completed: true },
  { id: 3, title: "Write Documentation", category: "Content", priority: "Low", date: "2024-02-22", completed: false },
  { id: 4, title: "Fix Navbar CSS", category: "Dev", priority: "Medium", date: "2024-02-20", completed: false },
  { id: 5, title: "Design Landing Page", category: "Design", priority: "High", date: "2024-02-20", completed: false },
];


export default function HomePage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  // Handlers
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="ambient-light">
        <div className="blob purple"></div>
        <div className="blob blue"></div>
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <header className="top-header">
          <div className="header-text">
            <h1>Hello, Alex! 👋</h1>
            <p>Here's what's happening today.</p>
          </div>
          <button className="btn-glow" onClick={() => setIsModalOpen(true)}>+ New Task</button>
        </header>

        <StatsOverview tasks={tasks} />

        <div className="content-area">
          <TaskFilters 
            filter={filter} setFilter={setFilter} 
            sort={sort} setSort={setSort} 
          />
          
          <div className="tasks-list">
            {filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
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
      </main>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={() => alert("Backend integration required for adding!")} 
      />
    </div>
  );
}