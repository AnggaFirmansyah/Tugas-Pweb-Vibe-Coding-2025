import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/AddEvent';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    // Router HARUS membungkus div terluar
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/" className="nav-brand">
            <span style={{ fontSize: '1.5rem' }}>✴️</span> MadingKampus
          </Link>

          <div className="nav-center">
            {token && (
              <>
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Discover
                </NavLink>
                <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Upload Poster
                </NavLink>
              </>
            )}
          </div>

          <div className="nav-right">
            {token ? (
              <button onClick={logout} className="btn-nav-action">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-nav-action">
                Login Account
              </Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
          <Route path="/add" element={token ? <AddEvent token={token} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;