import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent({ token }) {
  const [form, setForm] = useState({ title: '', organizer: '', date: '', description: '' });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Wajib upload poster!');
    const formData = new FormData();
    Object.keys(form).forEach(k => formData.append(k, form[k]));
    formData.append('image', file);
    try {
      await axios.post('http://localhost:5000/api/events', formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err) {
      alert('Gagal upload poster');
    }
  };

  return (
    <div className="page-centered">
      <div className="glass-card">
        <div className="card-icon-top">📌</div>
        <h2>Tempel Poster</h2>
        <p>Bagikan informasi kegiatanmu kepada seluruh warga kampus.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="input-icon">📝</span>
            <input placeholder="Nama Acara" onChange={e => setForm({...form, title: e.target.value})} required />
          </div>
          
          <div className="input-wrapper">
            <span className="input-icon">📢</span>
            <input placeholder="Penyelenggara" onChange={e => setForm({...form, organizer: e.target.value})} required />
          </div>

          <div className="input-wrapper">
            <span className="input-icon" style={{top:'12px'}}>🗓️</span>
            <input type="date" onChange={e => setForm({...form, date: e.target.value})} required />
          </div>

          <div className="input-wrapper">
            <textarea 
              rows="3" 
              placeholder="Deskripsi Singkat..." 
              onChange={e => setForm({...form, description: e.target.value})} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '12px', border: 'none', background: '#f3f4f6' }}
            ></textarea>
          </div>

          <div style={{ textAlign: 'left', marginBottom: '15px', background: '#f3f4f6', padding: '10px', borderRadius: '12px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', display: 'block', marginBottom: '5px' }}>Upload Gambar:</label>
            <input type="file" onChange={e => setFile(e.target.files[0])} required style={{ fontSize: '0.9rem' }} />
          </div>

          <button type="submit" className="btn-primary">Upload Poster</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;