import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.user.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: 'white'
      }}>
        <div style={{fontSize: '80px', marginBottom: '20px'}}>📝</div>
        <h1 style={{fontSize: '36px', fontWeight: '800', marginBottom: '15px'}}>Task Manager</h1>
        <p style={{fontSize: '16px', opacity: '0.9', textAlign: 'center', maxWidth: '300px', lineHeight: '1.8'}}>
          Organize your tasks, boost your productivity and achieve your goals faster.
        </p>
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {['📋 Create and organize tasks', '⚡ Track your progress', '✅ Complete goals faster'].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '10px',
              padding: '12px 20px',
              fontSize: '14px',
              backdropFilter: 'blur(10px)'
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{marginBottom: '8px'}}>Welcome Back</h2>
          <p style={{color: '#666', marginBottom: '25px', fontSize: '14px'}}>
            Login to manage your tasks
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label style={{fontSize: '13px', fontWeight: '600', color: '#444'}}>Email</label>
            <input type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <label style={{fontSize: '13px', fontWeight: '600', color: '#444'}}>Password</label>
            <input type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" style={{width: '100%', marginTop: '5px', padding: '14px'}}>
              Login
            </button>
          </form>

          <p style={{marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666'}}>
            New here? <a href="/register" className="link">Create one free</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;