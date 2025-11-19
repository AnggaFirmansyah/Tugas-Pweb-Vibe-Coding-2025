import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate(); // Ini hanya bisa jalan jika Login ada di dalam <Router> milik App.js

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'email') setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setEmailError("Format email salah! Gunakan @gmail.com dll.");
      return;
    }
    try {
      const url = isRegister ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';
      const { data } = await axios.post(url, form);
      if (!isRegister) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/');
      } else {
        alert('Akun dibuat! Silakan login.');
        setIsRegister(false);
      }
    } catch (err) {
      alert("Gagal: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="page-centered">
      <div className="glass-card">
        <div className="card-icon-top">🔐</div>
        <h2>{isRegister ? 'Create account' : 'Sign in with email'}</h2>
        <p>
          {isRegister 
            ? 'Buat akun baru untuk mulai berkarya.' 
            : 'Make a new doc to bring your words, data, and teams together. For free'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input name="username" placeholder="Full Name" required onChange={handleChange} />
            </div>
          )}

          <div className="input-wrapper">
            <span className="input-icon">✉️</span>
            <input 
              name="email" 
              placeholder="Email" 
              required 
              onChange={handleChange}
              style={{ borderColor: emailError ? 'red' : 'transparent', color: emailError ? 'red' : 'inherit' }}
            />
          </div>
          {emailError && <small style={{color:'red', display:'block', textAlign:'left', marginTop:'-10px', marginBottom:'10px'}}>{emailError}</small>}

          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          </div>

          <button type="submit" className="btn-primary">
            {isRegister ? 'Register' : 'Get Started'}
          </button>
        </form>

        <div className="divider">Or sign in with</div>
        <div className="social-row">
          <div className="social-btn">🇬</div>
          <div className="social-btn">🇫</div>
          <div className="social-btn">🍎</div>
        </div>

        <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
          {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
          <span onClick={() => setIsRegister(!isRegister)} style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
            {isRegister ? 'Sign in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;