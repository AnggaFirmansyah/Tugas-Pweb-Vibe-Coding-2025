# Tugas Vibe Coding - Pemrograman Web B

| Nama | NRP |
|--------|---------|
| Angga Firmansyah  | 5027241062   | 

> **Tugas Vibe Coding - Pemrograman Web**
> Solusi digital untuk penyebaran informasi kampus yang lebih rapi, terpusat, dan ramah lingkungan.

---

## 👨‍🎓 Identitas Pengembang

| Kategori | Keterangan |
| :--- | :--- |
| **Nama** | **Angga Firmansyah** |
| **NRP** | **5027241062** |
| **Mata Kuliah** | Pemrograman Web (Vibe Coding) |
| **Tema** | *Campus Utility / Problem Solving App* |

---

## 📝 Latar Belakang & Masalah (Problem Statement)

Di lingkungan kampus, penyebaran informasi kegiatan kemahasiswaan (seminar, lomba, *open recruitment*) sering kali menghadapi kendala:

1.  **Limbah Kertas:** Penggunaan poster fisik dan brosur menyumbang sampah kertas yang tidak sedikit.
2.  **Informasi Tersebar:** Info di grup WhatsApp sering tertumpuk *chat* lain (spam), sedangkan mading fisik memiliki ruang terbatas dan sering kali berantakan.
3.  **Aksesibilitas:** Mahasiswa harus datang ke lokasi fisik mading untuk melihat info terbaru.

## 💡 Solusi (Solution Overview)

**MadingKampus** adalah aplikasi web berbasis *Fullstack* yang mendigitalisasi fungsi mading konvensional.

* **Paperless:** Mengurangi penggunaan kertas dengan beralih ke poster digital.
* **Terpusat & Rapi:** Poster tersusun dalam grid yang estetis, mudah dilihat, dan dilengkapi detail acara (tanggal, penyelenggara).
* **Aman:** Hanya mahasiswa terdaftar yang bisa menempel poster, menjaga kualitas informasi dari spam eksternal.
* **User Experience Modern:** Menggunakan desain antarmuka *Glassmorphism* yang kekinian dan responsif.

---

## ⚙️ Tech Stack

Aplikasi ini dibangun menggunakan arsitektur **MERN Stack**:

### Backend (Server-Side)
* **Node.js & Express.js:** Sebagai *framework* server utama.
* **MongoDB & Mongoose:** Database NoSQL untuk menyimpan data *User* dan *Event*.
* **JWT (JSON Web Token):** Untuk autentikasi dan keamanan sesi login.
* **Multer:** Middleware untuk menangani *upload* file gambar poster ke server.

### Frontend (Client-Side)
* **React.js:** Library utama untuk membangun antarmuka pengguna.
* **React Router:** Untuk navigasi antar halaman tanpa *reload* (SPA).
* **Axios:** Untuk melakukan request HTTP ke API Backend.
* **CSS Modules:** Styling manual dengan desain *Glassmorphism*, *Pill Navigation*, dan tata letak responsif.

---

## ✨ Fitur Utama

### 1. Autentikasi Pengguna (Auth)
* **Register & Login:** Sistem keamanan menggunakan enkripsi password (bcrypt) dan token sesi (JWT).
* **Validasi Input:** Mencegah input email yang tidak valid atau data kosong saat registrasi.

### 2. Manajemen Poster (CRUD)
* **Create (Tempel Poster):** User dapat mengunggah gambar poster beserta detail acara (Judul, Penyelenggara, Tanggal, Deskripsi).
* **Read (Lihat Mading):** Dashboard utama menampilkan galeri poster yang diurutkan berdasarkan tanggal terbaru.
* **Delete (Cabut Poster):** User dapat menghapus poster buatan mereka sendiri. Sistem akan menolak jika user mencoba menghapus poster milik orang lain.

### 3. Desain Antarmuka (UI/UX)
* **Glassmorphism:** Efek kaca transparan pada kartu dan navbar untuk tampilan modern.
* **Responsive Layout:** Tampilan menyesuaikan layar desktop maupun perangkat mobile.

---

## 📂 Struktur Proyek

mading-kampus/ ├── backend/ # Server Side │ ├── Models/ # Skema Database (User.js, Event.js) │ ├── uploads/ # Penyimpanan file gambar fisik │ ├── server.js # Entry point server & API Routes │ └── package.json # Dependensi Backend │ └── frontend/ # Client Side ├── public/ └── src/ ├── pages/ # Halaman (Login, Dashboard, AddEvent) ├── App.js # Routing & Layout Utama ├── App.css # Styling Global (Glassmorphism) └── index.js # Entry point React


---

## 🚀 Cara Menjalankan (Installation)

Ikuti langkah ini untuk menjalankan aplikasi di komputer lokal:

### 1. Setup Backend
Buka terminal, masuk ke folder backend, instal dependensi, dan jalankan server.

```bash
cd backend
npm install
# Pastikan MongoDB sudah berjalan (Local atau Atlas)
# Buat file .env jika diperlukan (lihat server.js)
node server.js
```
Server akan berjalan di port 5000.

2. Setup Frontend
Buka terminal baru, masuk ke folder frontend, dan jalankan React.

```bash
cd frontend
npm install
npm start
```
Aplikasi akan terbuka otomatis di http://localhost:3000.
