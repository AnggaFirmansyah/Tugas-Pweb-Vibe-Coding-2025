require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const User = require('./models/users');
const Event = require('./models/event');

const app = express();
app.use(cors());
app.use(express.json());

// Setup Folder Uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

// Koneksi Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Middleware Auth
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Akses ditolak, token tidak ditemukan.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token tidak valid.' });
  }
};

// Config Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Fungsi Validasi Email Regex
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// --- ROUTES ---

// 1. Register
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Format email salah! Gunakan @gmail.com, @outlook.com dll.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email sudah terdaftar, silakan login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: 'Registrasi berhasil' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek Email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email tidak ditemukan.' });

    // Cek Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Password salah.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Create Event
app.post('/api/events', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, organizer, date, description } = req.body;
    const image = req.file ? req.file.path : '';
    const newEvent = new Event({
      title, organizer, date, description, image, creator: req.user.id
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Read Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).populate('creator', 'username');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Delete Event (FIXED)
app.delete('/api/events/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Poster tidak ditemukan' });

    // Cek Kepemilikan
    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Anda hanya bisa menghapus poster buatan sendiri!' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Poster berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));