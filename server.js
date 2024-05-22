const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk menyajikan konten statis (CSS)
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Menangani permintaan untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware untuk menyajikan konten video
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Menangani permintaan untuk file video
app.get('/assets/JILBAB/:videoName', (req, res) => {
    const videoName = req.params.videoName;
    res.sendFile(path.join(__dirname, 'assets', 'JILBAB', videoName));
});


app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Menangani permintaan untuk halaman hijab.html
app.get('/jilbab.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'jilbab.html'));
});
app.get('/bocil.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'bocil.html'));
});
app.get('/barat.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'barat.html'));
});


// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
