import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Hapus poster ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, { headers: { Authorization: token } });
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      alert("Gagal menghapus: " + (err.response?.data?.msg || "Error"));
    }
  };

  return (
    /* Gunakan class mading-container agar lebar full */
    <div className="mading-container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '10px' }}>☁️ Mading Kampus</h1>
        <p style={{ color: '#6b7280' }}>Temukan kegiatan seru di sekitarmu.</p>
      </div>

      <div className="mading-grid">
        {events.map(evt => (
          <div key={evt._id} className="poster-card">
            <div className="poster-img-box">
              <img src={`http://localhost:5000/${evt.image}`} alt="Poster" />
            </div>
            <div className="poster-info">
              <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight:'bold' }}>
                {new Date(evt.date).toLocaleDateString()}
              </span>
              <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{evt.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>By {evt.organizer}</p>
              <button onClick={() => handleDelete(evt._id)} style={{ width: '100%', marginTop: '10px', padding: '8px', background: '#fee2e2', color: 'red', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;