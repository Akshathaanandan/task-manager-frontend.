import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name, email, password
      });
      alert('Registered successfully! Please login.');
      navigate('/login');
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
        <div style={{fontSize: '80px', marginBottom: '20px'}}>🚀</div>
        <h1 style={{fontSize: '36px', fontWeight: '800', marginBottom: '15px'}}>Get Started</h1>
        <p style={{fontSize: '16px', opacity: '0.9', textAlign: 'center', maxWidth: '300px', lineHeight: '1.8'}}>
          Join thousands of productive people managing their tasks smarter.
        </p>
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {['🆓 Free forever', '🔒 Secure and private', '📱 Access anywhere'].map((item, i) => (
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
          <h2 style={{marginBottom: '8px'}}>Create Account</h2>
          <p style={{color: '#666', marginBottom: '25px', fontSize: '14px'}}>
            Start managing your tasks today
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label style={{fontSize: '13px', fontWeight: '600', color: '#444'}}>Full Name</label>
            <input type="text" placeholder="Akshatha"
              value={name} onChange={(e) => setName(e.target.value)} />

            <label style={{fontSize: '13px', fontWeight: '600', color: '#444'}}>Email</label>
            <input type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <label style={{fontSize: '13px', fontWeight: '600', color: '#444'}}>Password</label>
            <input type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" style={{width: '100%', marginTop: '5px', padding: '14px'}}>
              Create Account
            </button>
          </form>

          <p style={{marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666'}}>
            Already have an account? <a href="/login" className="link">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;