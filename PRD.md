# PRD(Product Development Document): WebDev Resource Hub

## 1. Problem Statement

Dalam proses belajar web development, mahasiswa/pelajar Informatika sering kali membutuhkan berbagai resource pendukung — seperti framework CSS (Tailwind, Bootstrap), library animasi, tools development (VirtualBox, dll), hingga referensi lainnya. Namun, resource-resource ini tersebar di banyak platform berbeda (Google, forum, grup diskusi, media sosial), sehingga:

* Sulit ditemukan kembali saat dibutuhkan.
* Memakan waktu untuk mencari resource yang relevan dan terpercaya.
* Tidak ada tempat terpusat yang mengumpulkan resource-resource ini secara terkurasi dan mudah dicari.

Akibatnya, proses belajar jadi kurang efisien karena waktu banyak terbuang untuk mencari link, bukan untuk belajar/eksplorasi materinya sendiri.

## 2. Goals & Objectives

Berdasarkan problem statement di atas, ini draft goals-nya:

### Goals:

- Menyediakan satu platform terpusat yang mengumpulkan resource web development (framework, tools, library animasi, dll) dalam satu tempat.
- Mempermudah proses pencarian resource lewat fitur search dan filter kategori, sehingga user tidak perlu mencari manual di berbagai sumber.
- Memastikan resource yang ditampilkan sudah terkurasi (dipilih langsung, bukan sembarang link) sehingga kualitasnya terjaga.

### Objectives (target yang lebih terukur/spesifik):

- Mengumpulkan minimal 20 resource pilihan di v1, tersebar di beberapa kategori (framework, tools, dll).
- User bisa menemukan resource yang dicari dalam waktu kurang dari 10 detik lewat search/filter.
- Website bisa diakses dengan baik di desktop maupun mobile (responsive).

## 3. Target Users

### Primary User:

- Pelajar/mahasiswa dari jurusan Informatika, TKJ (Teknik Komputer Jaringan), RPL (Rekayasa Perangkat Lunak), atau bidang IT terkait lainnya.
- Level pengalaman: **Pemula hingga Menengah.**

### Karakteristik User:

- Terbiasa browsing/googling untuk cari referensi belajar/kerja tugas/project.
- Butuh akses cepat ke tools/resource tanpa proses ribet (nggak mau daftar akun, login, dll).
- Kemungkinan besar akses dari laptop saat kerja/belajar, tapi bisa juga cek cepat dari HP.
- Kebutuhan bervariasi tergantung minat: ada yang butuh resource web dev (CSS, framework), ada yang butuh resource networking, ada yang butuh resource IoT.

### Use Case Utama:

- "Saya lagi ngerjain project web dan butuh cari animasi CSS yang bagus" → filter kategori CSS Animation.
- "Saya anak TKJ, lagi cari tools buat simulasi jaringan" → filter kategori Networking.
- "Saya lagi belajar IoT, butuh referensi microcontroller/platform" → filter kategori IoT.
- "Saya baru denger nama tools X, mau tau itu apa" → search nama tools, ketemu deskripsi singkat + link.

## 4. Functional Requirements 

### FR-1: Menampilkan Daftar Resource

- Sistem menampilkan seluruh resource dalam bentuk list/card, otomatis dikelompokkan (grouped) per kategori.
- Setiap card menampilkan: nama resource, deskripsi singkat, kategori, dan link menuju resource asli.

### FR-2: Pencarian (Search)

- User dapat mencari resource lewat search bar berdasarkan nama atau keyword.
- Hasil pencarian ter-update secara real-time (tanpa reload halaman) saat user mengetik.

### FR-3: Filter Kategori (Single-Select)

- User dapat memfilter resource berdasarkan satu kategori pada satu waktu (misal: Web Development, Networking, atau IoT).
- Memilih kategori lain akan otomatis mengganti filter sebelumnya (bukan menambah).

### FR-4: Navigasi ke Resource Eksternal

- Saat user klik salah satu resource, sistem membuka link tersebut di tab baru.

### FR-5: Reset Filter/Pencarian

- User dapat mengembalikan tampilan ke kondisi awal (semua resource tampil, grouped by category) dengan satu klik tombol "Reset"/"Clear".

### FR-6: Empty State

- Jika hasil pencarian/filter tidak ditemukan, sistem menampilkan pesan yang jelas (misal: "Resource tidak ditemukan, coba kata kunci lain").

### FR-7: Kategorisasi Data

- Setiap resource wajib memiliki satu kategori utama agar bisa dikelompokkan dan difilter dengan benar.

### FR-8: Counter Jumlah Resource per Kategori

- Sistem menampilkan jumlah resource di setiap kategori, contoh: "CSS Framework (12)", "Networking Tools (8)".
- Counter ini otomatis ter-update sesuai jumlah data yang ada di JSON (tidak hardcode manual).

### FR-9: Auto Sort by Category

- Dashboard/halaman utama otomatis menampilkan resource yang sudah dikelompokkan (sorted) berdasarkan kategori, tanpa perlu aksi tambahan dari user.

## 5. Product Scope 

### In Scope (v1):

- Website statis (HTML + Tailwind CSS + Vanilla JS), tanpa backend/database.
- Data resource disimpan hardcode di file JSON.
- Fitur: tampilkan list resource (grouped by category), search real-time, filter kategori (single-select), reset filter, empty state, counter jumlah resource per kategori.
- Kategori utama mencakup minimal 3 domain: Web Development, Networking, IoT (dengan sub-kategori di masing-masing).
- Responsive design (mobile & desktop).
- Konten campur Bahasa Indonesia & English (menyesuaikan istilah teknis yang lazim dipakai).
- Version control & collab pakai GitHub.
- Deploy sebagai static site via Vercel atau Netlify.

### Out of Scope (v1.x — masuk Future Considerations):

- Fitur submit link dari user (community-driven).
- Rating/upvote/comment system.
- Backend & database (semua masih hardcode JSON).
- Dark mode.
- Search lanjutan (misal search by tag, advanced filter multi-kategori).


## 6. Features & Requirements

### 6.1 Hero/Header Section

Deskripsi: Bagian atas halaman yang berisi judul website, tagline singkat, dan search bar utama.

**Requirement:**

- Menampilkan nama produk & tagline singkat (misal: "Kumpulan resource web dev, networking, dan IoT dalam satu tempat").
- Search bar ditempatkan di sini agar langsung terlihat saat halaman dibuka.

### 6.2 Search Bar

Deskripsi: Input pencarian resource berdasarkan nama/keyword.

**Requirement:**

- Placeholder text jelas, misal: "Cari resource... (contoh: tailwind, virtualbox, cisco)".
- Search bekerja real-time (setiap kali user ngetik, list langsung ter-filter — pakai input event, bukan perlu tombol submit).
- Search mencocokkan berdasarkan name, description, dan tags (biar hasil lebih akurat).
- Search bersifat case-insensitive.

### 6.3 Kategori & Filter Navigation

Deskripsi: Daftar kategori yang bisa diklik untuk memfilter resource (single-select, sesuai kesepakatan sebelumnya).

**Requirement:**

- Ditampilkan sebagai tab/pill/button, contoh: Semua | Web Development | Networking | IoT.
- Setiap kategori menampilkan counter jumlah resource, contoh: Web Development (24).
- Kategori yang aktif/dipilih harus punya visual state berbeda (misal warna background berubah).
- Kategori "Semua" jadi default state saat halaman pertama dibuka.

### 6.4 Kategori (Revisi — tanpa sub-kategori)

**Requirement:**

- Kategori cuma 3 level utama: Web Development, Networking, IoT .
- Tidak ada sub-kategori, jadi filter cukup single-level.
- Setiap resource cukup punya satu category di data JSON.

### 6.5 Resource Card — Icon Strategy (Revisi)

**Requirement:**

- Prioritas icon per resource:
  1. Icon asli dari tools/resource tersebut (misal logo Tailwind, logo VirtualBox) — biar lebih representatif & seragam secara visual.
  2. Kalau nggak ketemu/nggak available, fallback ke Font Awesome atau Google Icons/Material Icons.
  3. Kalau tetap nggak ada yang cocok, pakai icon generic per kategori sebagai fallback terakhir.
- (Catatan: strategi ini masih fleksibel, bisa disesuaikan pas mulai proses pengumpulan data — kalau ternyata icon asli terlalu ribet dicari satu-satu, boleh direvisi ke icon generic aja biar lebih cepat & konsisten.)

### 6.6 Empty State

Deskripsi: Tampilan saat hasil search/filter kosong.

**Requirement:**

- Ilustrasi/icon sederhana (opsional) + teks: "Resource tidak ditemukan. Coba kata kunci lain."
- Tombol "Reset" muncul di sini untuk kembali ke tampilan awal.

### 6.7 Footer

Deskripsi: Bagian bawah halaman.

**Requirement:**

- Info singkat pembuat/credit.
- Link ke GitHub repo. 


