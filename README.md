# Velsamen — Angkatan VIII 2026

Website resmi angkatan ke-8 SMA Islam Qurani Al-Bahjah Cirebon, lulusan 2026.

## Tentang

Situs ini adalah halaman kenangan digital angkatan **Velsamen** — tempat mengabadikan momen, profil kelas, dan galeri aktivitas selama 3 tahun bersama.

## Halaman

| Halaman | Deskripsi |
|---|---|
| `/` | Beranda — hero, sambutan ketua, preview kelas |
| `/about.html` | Visi misi, timeline, dan struktur pengurus angkatan |
| `/kelas.html` | Hub direktori 4 kelas (XII MIPA 1–3 & XII IPS) |
| `/kelas/[nama].html` | Detail per kelas: cerita, struktur, dan roster anggota |
| `/gallery.html` | Galeri foto aktivitas dan event resmi |
| `/contact.html` | Channel resmi angkatan (Instagram, email, TikTok, Spotify) |

## Tech Stack

- **HTML5 / CSS3 / JavaScript (ES6+)** — static site, no build tool
- **Bootstrap v5.3** + **Bootstrap Icons** — layout & komponen UI
- **jQuery v3.7** — injeksi navbar/footer dan interaksi halaman
- Semua dependensi disimpan **lokal** (`assets/`), tidak bergantung CDN

## Struktur Singkat

```
app/
├── assets/        # CSS, JS, gambar
├── components/    # navbar.html & footer.html (injeksi global)
├── kelas/         # 4 halaman detail kelas
├── index.html
├── about.html
├── kelas.html
├── gallery.html
└── contact.html
```

> Foto dan aset media asli belum tersedia — sementara menggunakan `assets/img/temp/temp_img.jpg` sebagai placeholder di seluruh halaman.
