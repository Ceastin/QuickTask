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

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { format, subDays } from 'date-fns';





export default function HomePage() {
  const navigate=useNavigate();
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [sort, setSort] = useState('Newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchagain,setFetchAgain]=useState(true);
  const [userStats, setUserStats] = useState(null);
  const [productivityTrend, setProductivityTrend] = useState([]);
  const [dateRange, setDateRange] = useState({ start: subDays(new Date(), 7), end: new Date() });

  useEffect(() => {
    if (activeTab === "Analytics") { 
      const fetchAnalytics = async () => {
        try {
          const userId = localStorage.getItem('userId'); 
          
          // 1. Fetch User Statistics
          const statsRes = await fetch(`https://quicktask-analytics-8r8q.onrender.com/api/v1/analytics/users/${userId}/statistics`);
          const statsData = await statsRes.json();


          setUserStats(statsData);

          // 2. Fetch Productivity Trends
          const sDate = format(dateRange.start, 'yyyy-MM-dd');
          const eDate = format(dateRange.end, 'yyyy-MM-dd');
          const trendRes = await fetch(`https://quicktask-analytics-8r8q.onrender.com/api/v1/analytics/users/${userId}/productivity?start_date=${sDate}&end_date=${eDate}`);
          const trendData = await trendRes.json();


          setProductivityTrend(trendData.trends);

        } catch (error) {
          console.error("Error loading analytics", error);
        }
      };
      fetchAnalytics();
    }
  }, [activeTab, dateRange]);

// Colors for the charts matching your theme
const COLORS = ['#FF9800', '#FFCC80', '#E65100']; 
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
  localStorage.removeItem("name");
  localStorage.removeItem("userId");
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

    <main className="main-content">
      
      {/* ---------------- DASHBOARD TAB ---------------- */}
      {activeTab === "Dashboard" && (
        <>
          <header className="top-header">
            <div className="header-text">
              <h1>Hello, {localStorage.name || 'User'}!</h1>
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
      {activeTab === "Analytics" && (
        <div className="analytics-container">
          
          {/* Header Section */}
          <header className="analytics-header">
            <div>
              <h2>Personal Performance</h2>
              <p>Your task completion stats for the last 7 days.</p>
            </div>
            <div className="date-display">
              {format(dateRange.start, 'MMM dd')} - {format(dateRange.end, 'MMM dd, yyyy')}
            </div>
          </header>

          {userStats ? (
            <>
              {/* Top Row: Key Metrics Cards */}
              <div className="metrics-grid">
                <div className="metric-card glass-panel">
                  <div className="metric-icon">🏆</div>
                  <div className="metric-info">
                    <span className="label">Completion Rate</span>
                    <span className="value highlight">{userStats.completion_rate}</span>
                  </div>
                </div>
                
                <div className="metric-card glass-panel">
                  <div className="metric-icon">📝</div>
                  <div className="metric-info">
                    <span className="label">Total Assigned</span>
                    <span className="value">{userStats.total_tasks}</span>
                  </div>
                </div>

                <div className="metric-card glass-panel">
                  <div className="metric-icon">✅</div>
                  <div className="metric-info">
                    <span className="label">Completed</span>
                    <span className="value text-success">{userStats.completed_tasks}</span>
                  </div>
                </div>

                <div className="metric-card glass-panel">
                  <div className="metric-icon">⏳</div>
                  <div className="metric-info">
                    <span className="label">Pending</span>
                    <span className="value text-warning">{userStats.pending_tasks}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Charts */}
              <div className="charts-container">
                
                {/* Chart 1: Priority Distribution (Doughnut) */}
                <div className="chart-card glass-panel">
                  <h3>Priority Distribution</h3>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Low', value: userStats.priority_distribution.low || 0 },
                            { name: 'Medium', value: userStats.priority_distribution.Medium || 0 },
                            { name: 'High', value: userStats.priority_distribution.High || 0 },
                          ]}
                          cx="50%" cy="50%"
                          innerRadius={60} outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Productivity Trend (Bar) */}
                <div className="chart-card glass-panel wide">
                  <h3>Completion Trend</h3>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={productivityTrend}>
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(str) => format(new Date(str), 'dd MMM')}
                          stroke="#795548"
                          fontSize={12}
                        />
                        <YAxis stroke="#795548" fontSize={12} allowDecimals={false}/>
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="completed" fill="#FF9800" radius={[10, 10, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="loading-state">
              <p>Crunching the numbers... 📊</p>
            </div>
          )}
        </div>
      )}
    </main>
  </div>
);
}