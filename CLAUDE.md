# CLAUDE.md — Panduan Konteks Proyek Velsamen

Dokumen ini adalah panduan konteks untuk Claude Code agar memahami proyek ini sebelum mengerjakan tugas apapun.

---

## Gambaran Umum Proyek

**Velsamen** adalah website kenangan digital resmi angkatan ke-8 (VIII) SMA Islam Qurani Al-Bahjah Cirebon, lulusan 2026. Situs ini bersifat statis (*static site*) — tidak ada backend, tidak ada build tool, tidak ada framework JS modern.

- **Nama Angkatan:** Velsamen — Angkatan VIII 2026
- **Sekolah:** SMA Islam Qurani Al-Bahjah Cirebon
- **Total Anggota:** 144 kepala, 4 kelas (XII MIPA 1, XII MIPA 2, XII MIPA 3, XII IPS)
- **Repo GitHub:** `https://github.com/arahmanp/web-velsa`
- **Blueprint Proyek:** Lihat file [`blueprint.md`](blueprint.md) untuk spesifikasi desain lengkap

---

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| HTML5 / CSS3 / JavaScript | ES6+ | Core languages, tidak ada transpiler/bundler |
| Bootstrap | v5.3.x | Layout & komponen UI |
| Bootstrap Icons | — | Icon pack |
| jQuery | v3.7.x | Injeksi navbar/footer & interaksi halaman |

**ATURAN PENTING:** Semua dependensi disimpan **lokal** di folder `assets/`. Dilarang keras menggunakan URL CDN eksternal di tag `<link>` atau `<script>` manapun.

---

## Struktur Direktori

```
app/
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css         ← Bootstrap CSS (lokal)
│   │   ├── global.css                ← Styling global: variabel, tipografi, navbar, footer
│   │   ├── index.css                 ← CSS khusus halaman beranda
│   │   ├── about.css                 ← CSS khusus halaman tentang kami
│   │   ├── kelas.css                 ← CSS khusus halaman hub kelas
│   │   ├── gallery.css               ← CSS khusus halaman galeri
│   │   ├── contact.css               ← CSS khusus halaman kontak
│   │   ├── xii-mipa1.css             ← CSS khusus halaman kelas XII MIPA 1
│   │   ├── xii-mipa2.css             ← CSS khusus halaman kelas XII MIPA 2
│   │   ├── xii-mipa3.css             ← CSS khusus halaman kelas XII MIPA 3
│   │   ├── xii-ips.css               ← CSS khusus halaman kelas XII IPS
│   │   └── vendor/bootstrap-icons/   ← Bootstrap Icons (lokal)
│   ├── js/
│   │   ├── jquery.min.js             ← jQuery (lokal)
│   │   ├── bootstrap.bundle.min.js   ← Bootstrap JS (lokal)
│   │   ├── global.js                 ← Injeksi navbar & footer, active nav link, navbar scroll
│   │   ├── index.js                  ← Counter animasi stats section
│   │   ├── kelas.js                  ← Efek hover tilt pada class card
│   │   └── gallery.js                ← Filter galeri & lightbox custom
│   └── img/
│       ├── hero/                     ← Foto hero (belum diisi)
│       ├── kelas/                    ← Foto bersama per kelas (belum diisi)
│       ├── gallery/                  ← Foto event (belum diisi)
│       └── temp/
│           └── temp_img.jpg          ← PLACEHOLDER WAJIB untuk semua img sementara
├── components/
│   ├── navbar.html                   ← Komponen navbar (diinjeksi via jQuery)
│   └── footer.html                   ← Komponen footer (diinjeksi via jQuery)
├── kelas/
│   ├── xii-mipa1.html
│   ├── xii-mipa2.html
│   ├── xii-mipa3.html
│   └── xii-ips.html
├── index.html
├── about.html
├── kelas.html
├── gallery.html
├── contact.html
├── blueprint.md                      ← Spesifikasi desain & arsitektur lengkap
└── README.md
```

---

## Arsitektur CSS

**Prinsip:** Pisahkan style secara ketat per halaman.

- **`global.css`** — variabel CSS, reset, tipografi, navbar, footer, tombol, section utilities. Dimuat di **semua** halaman.
- **`x.css`** — layout dan komponen yang unik untuk halaman `x.html` saja. Ditulis di file terpisah.

### CSS Variables (defined in global.css)

```css
--clr-bg-dark:    #121212
--clr-bg-dark2:   #1a1a1a
--clr-bg-dark3:   #0d0d0d
--clr-white:      #ffffff
--clr-light:      #f5f5f5
--clr-accent:     #C5A880   /* Gold/Bronze — warna aksen utama */
--clr-accent2:    #D4AF37
--clr-text-dark:  #111111
--clr-text-muted: #888888
--clr-border:     rgba(197,168,128,0.25)
--font-heading:   'Playfair Display', Georgia, serif
--font-script:    'Dancing Script', cursive
--font-body:      'Inter', Helvetica, Arial, sans-serif
--transition:     all 0.35s ease
```

### Font

Dimuat via Google Fonts di `global.css` (`@import`): Playfair Display, Dancing Script, Inter.

---

## Arsitektur JavaScript

- **`global.js`** — dijalankan di semua halaman. Mendeteksi kedalaman path (`/kelas/` vs root) untuk menentukan prefix relatif, lalu menginjeksi `navbar.html` dan `footer.html`, mengatur active nav link, dan efek scroll shrink navbar.
- **`index.js`** — animasi counter angka pada stats section (3 Tahun / 4 Kelas / 144 Kepala) menggunakan IntersectionObserver-style via scroll event.
- **`kelas.js`** — efek hover tilt 3D pada `.class-card` menggunakan CSS transform perspective.
- **`gallery.js`** — filter tombol kategori (`.filter-btn` / `.g-item`) dan lightbox custom tanpa plugin eksternal (dibangun manual dengan jQuery overlay + nav prev/next + keyboard support).

### Mekanisme Injeksi Navbar & Footer

```javascript
// Deteksi apakah halaman ada di subfolder /kelas/
var inSubDir = path.indexOf('/kelas/') !== -1;
var prefix = inSubDir ? '../' : '';

$("#navbar-placeholder").load(prefix + "components/navbar.html");
$("#footer-placeholder").load(prefix + "components/footer.html");
```

Setiap halaman HTML wajib punya dua div ini:
```html
<div id="navbar-placeholder"></div>  <!-- di atas konten -->
<div id="footer-placeholder"></div>  <!-- di bawah konten -->
```

**PENTING:** jQuery `.load()` tidak berjalan via protokol `file://`. Wajib dijalankan melalui local HTTP server.

---

## Urutan Load Script (Wajib Dipatuhi)

Semua halaman root (`index.html`, `about.html`, dll.):
```html
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/global.js"></script>
<script src="assets/js/[page-specific].js"></script>  <!-- jika ada -->
```

Halaman di subfolder `kelas/`:
```html
<script src="../assets/js/jquery.min.js"></script>
<script src="../assets/js/bootstrap.bundle.min.js"></script>
<script src="../assets/js/global.js"></script>
```

---

## Daftar Halaman

| File | Judul | CSS Tambahan | JS Tambahan |
|---|---|---|---|
| `index.html` | Beranda | `index.css` | `index.js` |
| `about.html` | Tentang Kami | `about.css` | — |
| `kelas.html` | Direktori Kelas | `kelas.css` | `kelas.js` |
| `gallery.html` | Galeri Aktivitas | `gallery.css` | `gallery.js` |
| `contact.html` | Kontak Resmi | `contact.css` | — |
| `kelas/xii-mipa1.html` | XII MIPA 1 | `xii-mipa1.css` | — |
| `kelas/xii-mipa2.html` | XII MIPA 2 | `xii-mipa2.css` | — |
| `kelas/xii-mipa3.html` | XII MIPA 3 | `xii-mipa3.css` | — |
| `kelas/xii-ips.html` | XII IPS | `xii-ips.css` | — |

---

## Design System

**Konsep:** Premium Editorial Minimalist — dark theme, kontras tinggi, tipografi tegas.

### Warna
- Background utama: gelap (`#121212`)
- Accent: gold/bronze (`#C5A880`) — digunakan sangat minim
- Teks: putih di atas gelap, hitam di atas putih

### Tipografi
- Heading: Playfair Display — serif berat, all-caps, letter-spacing lebar
- Script/aksen: Dancing Script — cursive tipis berwarna emas
- Body: Inter — clean sans-serif, line-height 1.75

### Komponen Kunci
- `.btn-accent` — tombol solid emas, border-radius: 0
- `.btn-outline-accent` — tombol outline emas
- `.btn-outline-white` — tombol outline putih
- `.section-label` — label kecil uppercase berwarna emas (0.7rem, letter-spacing 0.3em)
- `.accent-line` — garis pembatas 60px x 2px warna emas
- `.section-padding` — padding vertikal 6rem
- `.text-script` — font Dancing Script berwarna emas
- `.img-cover` — helper `object-fit: cover`

### Galeri — Kategori Filter

Filter button menggunakan `data-filter`, item galeri menggunakan `data-cat`:
- `all` — semua foto
- `event` — Event Sekolah
- `kelas` — Kegiatan Kelas
- `sosial` — Sosial
- `wisuda` — Wisuda & Perpisahan

Item galeri yang bisa diklik lightbox wajib punya kelas `.g-item` dan `.lightbox-target`.

---

## Aturan Wajib (Rules of Execution)

1. **Lokal only** — Jangan pakai CDN. Semua `<link>` dan `<script>` mengarah ke path relatif dalam `assets/`.

2. **Placeholder wajib** — Semua tag `<img>` yang aset aslinya belum ada **wajib** menggunakan:
   - Halaman root: `assets/img/temp/temp_img.jpg`
   - Halaman di `kelas/`: `../assets/img/temp/temp_img.jpg`

3. **Pemisahan CSS ketat** — Style kosmetik global di `global.css`. Style layout spesifik halaman di `[halaman].css` masing-masing, termasuk halaman kelas detail.

4. **Privacy compliant** — Di halaman publik manapun, **dilarang keras** menyimpan/menampilkan:
   - Nama lengkap individu anggota
   - Nomor telepon
   - Alamat pribadi
   - Link media sosial pribadi
   - Data sensitif individu lainnya
   
   Roster anggota di halaman kelas hanya menampilkan **nama panggilan**.

5. **Bootstrap utility first** — Gunakan kelas Bootstrap (`d-flex`, `text-uppercase`, `shadow-sm`, dll.) sebelum menulis CSS kustom baru.

6. **Responsif** — Gunakan breakpoint Bootstrap yang adaptif (`col-12 col-md-6 col-lg-4`) agar tampil baik di mobile dan desktop.

7. **Tidak ada form input** — Halaman kontak menggunakan model no-form. Tidak ada `<form>`, `<input>`, atau `<textarea>` di halaman manapun.

8. **Selalu buat checkpoint** — Lakukan commit setiap kali menambahkan fitur/kode baru dengan commit message berbahasa inggris yang deskriptif.

---

## Cara Menjalankan Secara Lokal

Situs ini **tidak bisa** dibuka langsung via double-click (`file://`) karena jQuery `.load()` akan gagal akibat CORS restriction.

**Pilihan 1 — VS Code Live Server (termudah):**
1. Install ekstensi Live Server di VS Code
2. Klik kanan `index.html` → "Open with Live Server"
3. Buka `http://127.0.0.1:5500`

**Pilihan 2 — Python:**
```bash
cd path/to/app
python -m http.server 8080
# Buka: http://localhost:8080
```

**Pilihan 3 — Node.js:**
```bash
npx serve .
# Buka URL yang muncul di terminal
```

---

## Status Aset Media

Seluruh aset foto nyata **belum tersedia**. Semua `<img>` saat ini mengarah ke `assets/img/temp/temp_img.jpg` sebagai placeholder. Folder yang disiapkan untuk aset asli:
- `assets/img/hero/` — foto hero halaman beranda
- `assets/img/kelas/` — foto bersama per kelas
- `assets/img/gallery/` — foto event dan aktivitas

Ketika aset asli sudah tersedia, ganti path placeholder per-gambar sesuai konteksnya.

---

## Hal yang Perlu Diperhatikan Saat Berkontribusi

- Saat menambah halaman baru, pastikan urutan load CSS dan JS sesuai konvensi yang ada.
- Saat menambah kelas CSS baru yang bersifat global (dipakai >1 halaman), tulis di `global.css`.
- Saat memperbarui navbar atau footer, edit file di `components/` — efeknya langsung ke semua halaman.
- Halaman `kelas/` menggunakan path `../` untuk semua aset (prefix relatif ke subfolder).
- Spotify embed di `contact.html` masih menggunakan playlist placeholder — ganti `src` iframe dengan URL embed playlist resmi angkatan saat tersedia.
