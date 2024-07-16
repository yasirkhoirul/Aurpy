import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Login from './pages/login.jsx';
import Forum from './pages/forum.jsx';
import Daftar from './pages/daftar.jsx';
import Laporan from './pages/laporan.jsx';
import LaporanKategori from './pages/laporantambahkategori.jsx';
import Koleksi from './pages/koleksi.jsx';
import LupaSandi from './pages/forgot.jsx';
import Detail from './pages/detail.jsx';
import Profile from './pages/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<App />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/laporanKategori" element={<LaporanKategori />} />
        <Route path="/koleksi" element={<Koleksi />} />
        <Route path="/lupapassword" element={<LupaSandi />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/detailprofile' element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
