import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://task-manager-api-lylm.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await axios.post('https://task-manager-api-lylm.onrender.com/api/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://task-manager-api-lylm.onrender.com/api/tasks/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://task-manager-api-lylm.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const pending = tasks.filter(t => t.status === 'pending');
  const inProgress = tasks.filter(t => t.status === 'in-progress');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div style={{minHeight:'100vh', background:'#f0f2f5'}}>

      <div className="navbar">
        <h1>📝 Task Manager</h1>
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <span style={{fontSize:'14px', color:'#666'}}>👋 Hello, {name}</span>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container">

        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'15px', marginBottom:'25px'}}>
          <div style={{background:'white', borderRadius:'12px', padding:'20px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'32px'}}>📋</div>
            <div style={{fontSize:'28px', fontWeight:'700', color:'#f59e0b'}}>{pending.length}</div>
            <div style={{color:'#666', fontSize:'14px'}}>Pending</div>
          </div>
          <div style={{background:'white', borderRadius:'12px', padding:'20px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'32px'}}>⚡</div>
            <div style={{fontSize:'28px', fontWeight:'700', color:'#4f46e5'}}>{inProgress.length}</div>
            <div style={{color:'#666', fontSize:'14px'}}>In Progress</div>
          </div>
          <div style={{background:'white', borderRadius:'12px', padding:'20px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'32px'}}>✅</div>
            <div style={{fontSize:'28px', fontWeight:'700', color:'#10b981'}}>{completed.length}</div>
            <div style={{color:'#666', fontSize:'14px'}}>Completed</div>
          </div>
        </div>

        <div style={{background:'white', borderRadius:'12px', padding:'20px', marginBottom:'25px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h3 style={{marginBottom:'15px', fontSize:'16px', fontWeight:'600'}}>➕ Add New Task</h3>
          <form onSubmit={createTask} style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
            <input style={{flex:'2', minWidth:'150px', marginBottom:'0'}}
              type="text" placeholder="Task title"
              value={title} onChange={(e) => setTitle(e.target.value)} />
            <input style={{flex:'3', minWidth:'150px', marginBottom:'0'}}
              type="text" placeholder="Description (optional)"
              value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Task</button>
          </form>
        </div>

        {tasks.length === 0 && (
          <div style={{textAlign:'center', padding:'60px', color:'#999'}}>
            <div style={{fontSize:'60px'}}>📭</div>
            <p style={{marginTop:'10px'}}>No tasks yet. Add one above!</p>
          </div>
        )}

        {tasks.map((task) => (
          <div key={task._id} className="task-card"
            style={{borderLeftColor: task.status === 'completed' ? '#10b981' : task.status === 'in-progress' ? '#f59e0b' : '#4f46e5'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <h3 style={{textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? '#999' : '#1a1a2e'}}>
                  {task.title}
                </h3>
                {task.description && <p>{task.description}</p>}
              </div>
              <button className="btn-danger"
                style={{padding:'6px 12px', fontSize:'12px'}}
                onClick={() => deleteTask(task._id)}>
                🗑️ Delete
              </button>
            </div>
            <div style={{marginTop:'10px'}}>
              <select value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}>
                <option value="pending">📋 Pending</option>
                <option value="in-progress">⚡ In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;