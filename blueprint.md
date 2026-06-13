# MASTER BLUEPRINT: HIGH-SCHOOL OFFICIAL WEBPAGE (COMPANY PROFILE STYLE)

## SECTION 1: SYSTEM & TECH STACK BRIEF
AI Coding Agent harus membangun sistem web ini dengan arsitektur statis yang ringan, cepat, dan terstruktur tanpa framework JS modern. Seluruh aset dependensi wajib disimpan dan dipanggil dari direktori lokal (tanpa bergantung pada CDN internet).

* **Core Languages:** HTML5, CSS3, JavaScript (ES6+).
* **Libraries & Frameworks (OFFLINE/LOCAL ONLY):**
    * **Bootstrap v5.3.x** (File `bootstrap.min.css` dan `bootstrap.bundle.min.js` disimpan lokal).
    * **jQuery v3.7.x** (File `jquery.min.js` disimpan lokal).
* **Icon Pack:** **Bootstrap Icons** (File `bootstrap-icons.css` beserta folder *fonts*-nya diunduh dan disimpan lokal).
* **Plugins:** Lightbox2 atau Magnific-Popup lokal (Untuk fitur galeri gambar).
* **Placeholder Media Asset:** Untuk semua komponen gambar yang aset aslinya belum tersedia, AI Agent **wajib** menggunakan berkas gambar sementara yang terletak di `assets/img/temp/temp_img.jpg`.

---

## SECTION 2: DESIGN SYSTEM & VISUAL EXTRACT
Konsep desain mengadopsi **"Premium Editorial Minimalist"** dengan pendekatan kontras tinggi (*Dark-Theme Base* atau *Bold Block Partition*) hasil ekstraksi visual dari file referensi *exmpl 1.webp*, *exmpl 2.jpg*, dan *exmpl 3.jpeg*.

### 1. Warna & Kontras (Color Palette)
* **Primary Background:** Rich Dark (`#121212` atau `#1a1a1a`) terinspirasi dari basis gelap pada *exmpl 1.webp* dan *exmpl 2.jpg*.
* **Contrast Block:** Pure White (`#FFFFFF`) untuk partisi section besar, meniru teknik *exmpl 2.jpg* (kontras ekstrem antara background hitam dan card putih polos).
* **Accent Color:** Gold/Bronze (`#C5A880` atau `#D4AF37`) digunakan sangat minim hanya untuk inline script font, highlight kecil, atau border tipis seperti pada tipe teks "HAIRDO" di *exmpl 2.jpg*.
* **Typography Text:** `#FFFFFF` di atas area gelap, dan `#111111` di atas area putih.

### 2. Tipografi (Typography)
* **Heading Font:** Serif atau Sans-Serif yang tebal, tegas, berspasi lebar, dan *All-Caps* (Kapital semua) untuk judul section utama, meniru teks "BEAUTY" (*exmpl 3.jpeg*) dan "HAIRDO" (*exmpl 2.jpg*).
* **Sub-heading Font:** Script/Cursive font tipis berwarna emas untuk aksen estetik di atas judul utama (meniru penempatan *"Lorem ipsum"* pada *exmpl 2.jpg*).
* **Body Font:** Clean Sans-Serif (seperti Inter, Helvetica, atau Roboto) dengan *line-height* yang renggang (`1.6` - `1.8`) untuk kesan editorial yang kuat (*exmpl 1.webp*).

### 3. Komponen Visual & Layout Rule
* **Hero Image:** Menggunakan foto portrait/landscape dengan ekspresi *high-fashion/editorial lookup* yang tajam, dipadukan dengan overlay gelap tipis agar teks putih di atasnya terbaca sempurna (*exmpl 2.jpg* & *exmpl 3.jpeg*).
* **Card Element:** Menggunakan desain *Bento-style* berujung tajam (`border-radius: 0px` atau maksimal `4px`) dengan padding dalam yang luas.
* **Spasi & Whitespace:** Setiap section wajib dipisahkan dengan padding vertikal yang besar (`py-5` atau `my-5` pada Bootstrap) untuk memberikan ruang bernapas pada konten.

---

## SECTION 3: ARCHITECTURE & DIRECTORY TREE
AI Agent harus menyusun struktur direktori proyek secara modular sebagai berikut. Pustaka lokal wajib diletakkan di folder vendor, sedangkan berkas CSS/JS kustom wajib mengikuti konvensi penamaan berbasis nama halaman (`x.html` -> `x.css` / `x.js`) serta mewarisi gaya dari `global.css`.

```text
app/
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css         <-- File Lokal Bootstrap CSS
│   │   ├── global.css                <-- Kustom styling global (fonts, warna dasar, variabel)
│   │   ├── index.css                 <-- Kustom CSS khusus halaman beranda
│   │   ├── about.css                 <-- Kustom CSS khusus halaman tentang kami
│   │   ├── kelas.css                 <-- Kustom CSS khusus halaman utama kelas
│   │   ├── gallery.css               <-- Kustom CSS khusus halaman galeri
│   │   ├── contact.css               <-- Kustom CSS khusus halaman kontak resmi
│   │   └── vendor/
│   │       └── bootstrap-icons/
│   │           ├── bootstrap-icons.css <-- File Lokal Bootstrap Icons
│   │           └── fonts/            <-- Font files bawaan Bootstrap Icons
│   │
│   ├── js/
│   │   ├── bootstrap.bundle.min.js   <-- File Lokal Bootstrap JS bundle
│   │   ├── jquery.min.js             <-- File Lokal jQuery Core
│   │   ├── global.js                 <-- Script global (injection navbar & footer)
│   │   ├── index.js                  <-- Logic kustom khusus halaman beranda
│   │   ├── kelas.js                  <-- Logic kustom khusus halaman utama kelas
│   │   └── gallery.js                <-- Logic kustom khusus halaman galeri
│   │
│   └── img/
│       ├── hero/
│       ├── kelas/                    <-- Foto bersama per kelas resmi
│       ├── gallery/                  <-- Foto event resmi
│       └── temp/
│           └── temp_img.jpg          <-- MANDATORY: Gambar placeholder untuk semua aset yang belum ada
│
├── components/                       <-- Global reusable components
│   ├── navbar.html
│   └── footer.html
│
├── kelas/                            <-- Sub-folder khusus untuk detail tiap kelas resmi
│   ├── xii-mipa1.html
│   ├── xii-mipa2.html
│   ├── xii-mipa3.html
│   └── xii-ips.html
│
├── index.html                        <-- Beranda
├── about.html                        <-- Tentang Kami (Milestone)
├── kelas.html                        <-- Hub Utama Direktori Kelas (Berisi 4 Card Kelas)
├── gallery.html                      <-- Galeri Aktivitas
└── contact.html                      <-- Halaman Kontak Resmi (No-Form Privacy Model)

```

---

## SECTION 4: SPECIFIC PAGE BLUEPRINTS (FOR AI CODING AGENT)

### 1. Global Component Layout Injection

* **Rule:** AI Agent wajib mengosongkan area Navbar dan Footer di setiap file root HTML, lalu menyuntikkannya secara dinamis menggunakan jQuery saat dokumen siap melalui berkas script global.
* **Execution Code Prompt (Inside `assets/js/global.js`):**

```javascript
    $(document).ready(function() {
        $("#navbar-placeholder").load("components/navbar.html");
        $("#footer-placeholder").load("components/footer.html");
    });
```

### 2. `index.html` (Homepage)
* **File Pairing:** Wajib memuat `assets/css/global.css`, `assets/css/index.css`, dan `assets/js/index.js`.
* **Layout Component:**
* **Hero Section:** Full screen height (`min-vh-100`), teks rata kiri dengan kontras tinggi. Sebelah kanan diisi satu komponen gambar tajam bertarget path `assets/img/temp/temp_img.jpg` (*exmpl 1.webp* style).
* **Sambutan Section:** Layout asimetris 2 kolom (`.col-md-5` diisi gambar `assets/img/temp/temp_img.jpg` untuk foto ketua angkatan, `.col-md-7` untuk teks sambutan).
* **Statistik Block:** Menggunakan baris pembatas putih murni (`.bg-white .text-dark`) di antara dua section gelap untuk memecah kebosanan (*exmpl 2.jpg* style).
* **Icon Usage:** Gunakan kelas ikon seperti `<i class="bi bi-people-fill"></i>` dari Bootstrap Icons lokal untuk mempercantik komponen visual atau statistik.
* **Content Required:** Teks sambutan formal, data counter angka (3 Tahun, 4 Kelas, [Total Siswa] Kepala).

### 3. `about.html` (Tentang Kami)
* **File Pairing:** Wajib memuat `assets/css/global.css` dan `assets/css/about.css`.
* **Layout Component:**
* **Visi Misi:** Desain minimalis terpusat (`.text-center .mx-auto`).
* **Timeline:** Garis vertikal tipis menggunakan utility border Bootstrap. Setiap node di sisi kanan/kiri memiliki deskripsi pendek dan komponen gambar mini bertarget path `assets/img/temp/temp_img.jpg`.
* **Struktur Inti:** Grid baris bertingkat menggunakan susunan kartu tanpa border (`.card .border-0`). Semua foto profil jajaran pengurus di-set sementara ke `assets/img/temp/temp_img.jpg`.

### 4. `kelas.html` (Hub Utama Direktori Kelas)
* **File Pairing:** Wajib memuat `assets/css/global.css`, `assets/css/kelas.css`, dan `assets/js/kelas.js`.
* **Layout Component:**
* Grid System Responsif (`.row .row-cols-1 .row-cols-md-2 .col-lg-4 .g-4` atau disesuaikan untuk total 4 entitas).
* Diisi tepat **4 buah Class Card** utama yang merepresentasikan pembagian kelas resmi:
    1. **XII MIPA 1**
    2. **XII MIPA 2**
    3. **XII MIPA 3**
    4. **XII IPS**
* **Visual Design Element:**
* Setiap card menggunakan gambar `assets/img/temp/temp_img.jpg` sebagai background gambar utama kelas. Teks nama kelas diletakkan di bagian bawah dengan gradasi hitam (`linear-gradient`) transparan agar tulisan terbaca.
* **Interaction:** Tombol *"Masuk ke Ruang Kelas"* menggunakan ikon panah `<i class="bi bi-arrow-right-short"></i>` dan mengarah langsung ke file HTML terkait:
* Card XII MIPA 1 -> `href="kelas/xii-mipa1.html"`
* Card XII MIPA 2 -> `href="kelas/xii-mipa2.html"`
* Card XII MIPA 3 -> `href="kelas/xii-mipa3.html"`
* Card XII IPS -> `href="kelas/xii-ips.html"`

### 5. `kelas/[nama-kelas].html` (Halaman Khusus Detail Kelas - 4 Files)
* **Target Implementasi:** Diaplikasikan secara identik pada file `xii-mipa1.html`, `xii-mipa2.html`, `xii-mipa3.html`, dan `xii-ips.html`.
* **File Pairing:** Wajib memuat `assets/css/global.css`.
* **Layout Component:**
* **Header:** Banner kelas skala lebar (`w-100`) menggunakan gambar placeholder `assets/img/temp/temp_img.jpg`, memajang kutipan/slogan kelas terbesar di tengahnya.
* **Section 1 (Story & Fun Facts):** Layout korporat, memaparkan pencapaian, cerita internal, dan karakteristik unik masing-masing kelas.
* **Section 2 (Struktur Kelas):** Jajaran pengurus internal kelas. Seluruh foto individu digantikan oleh berkas `assets/img/temp/temp_img.jpg`.
* **Section 3 (Roster Anggota - PRIVACY COMPLIANT):** Grid foto potret berukuran kecil (`.col-3 .col-md-2`). **Seluruh foto roster wajib menggunakan gambar placeholder `assets/img/temp/temp_img.jpg`** dan **HANYA menampilkan NAMA PANGGILAN**. Dilarang keras menaruh link eksternal (Instagram/LinkedIn pribadi), nomor telepon, atau data sensitif individu lainnya guna menjaga privasi dari publik internet.

### 6. `gallery.html` (Galeri Aktivitas)
* **File Pairing:** Wajib memuat `assets/css/global.css`, `assets/css/gallery.css`, dan `assets/js/gallery.js`.
* **Layout Component:**
* **Filter Nav:** Button group Bootstrap di posisi tengah atas untuk mengubah status visibilitas kategori album foto via jQuery.
* **Bento Grid / Masonry:** Tampilkan barisan kotak foto dengan variasi rasio untuk meniru tata letak galeri majalah fashion (*exmpl 3.jpeg*). **Seluruh thumbnail dan gambar besar target menggunakan berkas tunggal `assets/img/temp/temp_img.jpg`**.
* **Interaction:** Setiap elemen `<img>` wajib dibungkus tag `<a>` dengan kelas `.lightbox-target` dan `href="assets/img/temp/temp_img.jpg"` agar fungsi popup carousel internal berjalan sempurna saat gambar diklik.

### 7. `contact.html` (Halaman Kontak Resmi - NO-FORM MODEL)
* **File Pairing:** Wajib memuat `assets/css/global.css` dan `assets/css/contact.css`.
* **Layout Component:**
* Satu kartu besar terpusat di tengah layar (`.col-md-6 .mx-auto .text-center`), tidak menggunakan formulir input sama sekali untuk menghindari celah bot spam dan masalah kebocoran data pribadi.
* **Icon & Content Required:**
* Judul: **"OFFICIAL CHANNELS"** menggunakan tipe font kapital berukuran besar.
* List ikon media sosial resmi angkatan menggunakan elemen Bootstrap Icons lokal yang dikombinasikan dengan teks link yang rapi:
    * `<i class="bi bi-instagram"></i> @angkatan2026`
    * `<i class="bi bi-envelope-fill"></i> official@email.com`
    * `<i class="bi bi-tiktok"></i> @tiktok_angkatan`
* Bagian bawah disisipkan *Widget Embed Player Spotify* resmi berisi playlist lagu kenangan masa sekolah angkatan.

---

## SECTION 5: AI CODING AGENT INSTRUCTIONS (RULES OF EXECUTION)
Ketika mengimplementasikan dokumen panduan ini, AI Agent wajib mematuhi aturan berikut:
1. **Strict Local Path Verification:** Jangan biarkan ada tag `<link>` atau `<script>` yang mengarah ke URL eksternal CDN. Semua aset wajib mengarah ke path relatif di dalam folder `assets/`.
2. **File Architecture Adherence:** Implementasikan pemisahan style secara disiplin. Aturan kosmetik yang berlaku untuk seluruh website harus ditulis di `global.css`. Sedangkan layout spesifik komponen halaman `x.html` mutlak ditulis hanya pada `x.css` dan `x.js`.
3. **MANDATORY Placeholder Fallback:** Seluruh tag `<img>` dan tautan gambar `<a>` di setiap file HTML (Beranda, Tentang Kami, Galeri, 4 halaman kelas detail) tanpa pengecualian **wajib** menggunakan path relatif menuju `assets/img/temp/temp_img.jpg` sebagai pengganti aset media visual sementara.
4. **Strict Privacy Check:** Jangan pernah membuat baris kode, variabel, atau objek JSON yang menyimpan nama lengkap, nomor telepon, alamat, atau media sosial pribadi dari anggota angkatan secara individual di halaman publik manapun.
5. **Bootstrap Utility First:** Gunakan kelas utilitas bawaan Bootstrap (`d-flex`, `justify-content-center`, `align-items-center`, `text-uppercase`, `shadow-sm`) sebelum menulis kustom CSS di berkas gaya.
6. **Responsive Testing Required:** Pastikan struktur grid menggunakan variasi breakpoint Bootstrap yang adaptif (`col-12 col-md-6 col-lg-4`) agar tampilan web tetap estetik saat diakses dari perangkat mobile (smartphone) maupun desktop.
