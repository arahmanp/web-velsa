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

---

## Cara Menjalankan Secara Lokal

> **Penting:** Situs ini menggunakan jQuery `.load()` untuk menyuntikkan navbar & footer. Fitur ini **tidak akan berjalan** jika file dibuka langsung via `file://` (double-click). Wajib dijalankan melalui local HTTP server.

### Opsi A — Clone Repository (Git)

**Prasyarat:** Git sudah terinstal ([git-scm.com](https://git-scm.com))

```bash
# 1. Clone repo ke komputer lokal
git clone https://github.com/arahmanp/web-velsa.git

# 2. Masuk ke folder project
cd web-velsa/
```

### Opsi B — Download ZIP

1. Buka halaman repository di GitHub
2. Klik tombol **Code** → **Download ZIP**
3. Ekstrak file ZIP ke folder pilihan
4. Buka folder hasil ekstrak hingga menemukan folder `app/`

---

### Menjalankan Local Server

Setelah folder `app/` siap, pilih salah satu cara berikut:

#### Cara 1 — VS Code Live Server *(Paling mudah)*
1. Install ekstensi **Live Server** di VS Code ([marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))
2. Buka folder `app/` di VS Code
3. Klik kanan pada `index.html` → **"Open with Live Server"**
4. Browser akan otomatis terbuka di `http://127.0.0.1:5500`

#### Cara 2 — Python *(Tanpa install apapun, Python sudah terinstal di Mac/Linux)*
```bash
# Masuk ke folder app/ terlebih dahulu
cd path/to/app

# Python 3
python -m http.server 8080

# Python 2 (jika versi lama)
python -m SimpleHTTPServer 8080
```
Buka browser dan akses: `http://localhost:8080`

#### Cara 3 — Node.js (`npx serve`)
```bash
# Pastikan Node.js sudah terinstal (nodejs.org)
# Tidak perlu install apapun, cukup jalankan:
npx serve .
```
Buka browser dan akses URL yang muncul di terminal (biasanya `http://localhost:3000`)

---

Setelah server berjalan, buka `http://localhost:<port>` di browser dan semua halaman (termasuk navbar & footer) akan tampil dengan benar.
