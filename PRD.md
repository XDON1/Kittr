# PRD(Product Development Document): WebDev Resource Hub

## 1. Problem Statement

Dalam proses belajar web development, mahasiswa/pelajar Informatika sering kali membutuhkan berbagai resource pendukung ➔ seperti framework CSS (Tailwind, Bootstrap), library animasi, tools development (VirtualBox, dll), hingga referensi lainnya. Namun, resource-resource ini tersebar di banyak platform berbeda (Google, forum, grup diskusi, media sosial), sehingga:

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
- Dark mode.

### Out of Scope (v1.x ➔ masuk Future Considerations):

- Fitur submit link dari user (community-driven).
- Rating/upvote/comment system.
- Light mode toggle
- Backend & database (semua masih hardcode JSON).
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
- Search bekerja real-time (setiap kali user ngetik, list langsung ter-filter ➔ pakai input event, bukan perlu tombol submit).
- Search mencocokkan berdasarkan name, description, dan tags (biar hasil lebih akurat).
- Search bersifat case-insensitive.

### 6.3 Kategori & Filter Navigation

Deskripsi: Daftar kategori yang bisa diklik untuk memfilter resource (single-select, sesuai kesepakatan sebelumnya).

**Requirement:**

- Ditampilkan sebagai tab/pill/button, contoh: Semua | Web Development | Networking | IoT.
- Setiap kategori menampilkan counter jumlah resource, contoh: Web Development (24).
- Kategori yang aktif/dipilih harus punya visual state berbeda (misal warna background berubah).
- Kategori "Semua" jadi default state saat halaman pertama dibuka.

### 6.4 Kategori 

**Requirement:**

- Kategori cuma 3 level utama: Web Development, Networking, IoT .
- Tidak ada sub-kategori, jadi filter cukup single-level.
- Setiap resource cukup punya satu category di data JSON.

### 6.5 Resource Card ➔ Icon Strategy

**Requirement:**

- Prioritas icon per resource:
  1. Icon asli dari tools/resource tersebut (misal logo Tailwind, logo VirtualBox) ➔ biar lebih representatif & seragam secara visual.
  2. Kalau nggak ketemu/nggak available, fallback ke Font Awesome atau Google Icons/Material Icons.
  3. Kalau tetap nggak ada yang cocok, pakai icon generic per kategori sebagai fallback terakhir.
- **(Catatan: strategi ini masih fleksibel, bisa disesuaikan pas mulai proses pengumpulan data ➔ kalau ternyata icon asli terlalu ribet dicari satu-satu, boleh direvisi ke icon generic aja biar lebih cepat & konsisten.)**

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

---

# HARUS DI CEK LAGI!!! 

## 7. Design System

### 7.1 Design Principles
- **Clean & Functional** ➔ fokus ke kemudahan cari resource, bukan visual yang ramai.
- **Developer-friendly aesthetic** ➔ nuansa yang familiar buat anak IT (dark-ish/monospace accent, mirip tampilan tools developer).
- **Consistent** ➔ semua komponen (card, button, badge) punya pola visual yang sama di seluruh halaman.

### 7.2 Color Palette

**Primary Colors (Tailwind-based):**

| Nama	| Hex	| Tailwind Class  |	Fungsi |
|-------|-----|-----------------|---------|
| Primary	| `#6366F1` (Indigo 500)	| `indigo-500` |	Tombol utama, link aktif, filter aktif |
| Primary Dark | `#4F46E5` (Indigo 600) |	`indigo-600` |	Hover state primary |
| Secondary	| `#0EA5E9` (Sky 500) |	`sky-500` |	Aksen sekunder, badge kategori tertentu |

**Neutral Colors (Dark Mode):**
| Nama | Hex | Tailwind Class | Fungsi |
|---|---|---|---|
| Background | `#0F172A` (Slate 900) | `slate-900` | Background utama halaman |
| Surface/Card | `#1E293B` (Slate 800) | `slate-800` | Background card resource |
| Border | `#334155` (Slate 700) | `slate-700` | Border card, divider |
| Text Primary | `#F8FAFC` (Slate 50) | `slate-50` | Judul, teks utama |
| Text Secondary | `#94A3B8` (Slate 400) | `slate-400` | Deskripsi, teks pendukung |
| Text Muted | `#64748B` (Slate 500) | `slate-500` | Placeholder, teks non-aktif |

**Primary Colors (disesuaikan biar kontras bagus di dark background):**
| Nama | Hex | Tailwind Class | Fungsi |
|---|---|---|---|
| Primary | `#818CF8` (Indigo 400) | `indigo-400` | Tombol utama, link aktif, filter aktif |
| Primary Hover | `#6366F1` (Indigo 500) | `indigo-500` | Hover state primary |
| Secondary | `#38BDF8` (Sky 400) | `sky-400` | Aksen sekunder |

**Category Accent Colors (disesuaikan buat dark mode):**
| Kategori | Hex | Tailwind Class |
|---|---|---|
| Web Development | `#818CF8` (Indigo 400) | `indigo-400` |
| Networking | `#34D399` (Emerald 400) | `emerald-400` |
| IoT | `#FBBF24` (Amber 400) | `amber-400` |

**Semantic Colors:**

| Nama |	Hex |	Tailwind Class |	Fungsi |
|------|------|----------------|---------|
| Success	| `#10B981` | `emerald-500` |	(opsional, untuk feedback positif) |
| Error/Empty	| `#EF4444` |	`red-500` |	Empty state, error message |

**Catatan penting untuk struktur CSS:**
- Karena light mode nyusul di v1.x, sebaiknya dari awal build pakai **CSS variables** (bukan hardcode Tailwind class dark mode manual), supaya nanti gampang nambahin toggle tanpa rombak ulang semua komponen.
- Contoh pendekatan: definisikan variable di `:root` (dark sebagai default), nanti pas v1.x tinggal tambah class `.light` yang override variable-nya.

```css
:root {
  --bg-primary: #0F172A;
  --bg-surface: #1E293B;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --border-color: #334155;
}
```

### 7.3 Typography

Font Family:

- **Heading/Judul:** Inter atau Poppins (sans-serif modern, gampang dibaca) ➔ pakai Google Fonts.
- **Body Text:** Inter (konsisten sama heading, biar simple nggak perlu 2 font).
- **Monospace accent** (opsional, buat elemen kecil kayak badge/tag): JetBrains Mono atau Fira Code ➔ kasih nuansa "developer" tanpa harus dipakai di seluruh teks.

**Type Scale (Tailwind classes):**

| Elemen	| Size	| Tailwind Class |	Weight |
|---------|-------|----------------|---------|
| H1 (Judul Hero) |	36-48px	| text-4xl / text-5xl |	font-bold |
| H2 (Section Title) |	24-30px |	text-2xl / text-3xl |	font-semibold |
| H3 (Card Title)	| 18-20px	| text-lg / text-xl |	font-semibold |
| Body	| 16px |	text-base |	font-normal |
| Small/Caption |	14px |	text-sm |	font-normal |
| Tiny (badge/tag) |	12px |	text-xs |	font-medium |

### 7.4 Spacing & Layout

**Container:**

- **Max-width:** 1280px (max-w-7xl), center dengan mx-auto.
- **Padding horizontal:** px-4 (mobile) → px-8 (desktop).

**Spacing Scale (pakai standar Tailwind, konsisten kelipatan 4px):**

- Gap antar elemen kecil (icon-text): gap-2 (8px)
- Gap antar card dalam grid: gap-4 / gap-6 (16-24px)
- Padding dalam card: p-4 / p-6
- Margin antar section: my-12 / my-16

**Grid System (Resource Card):**

- Mobile: grid-cols-1
- Tablet: grid-cols-2
- Desktop: grid-cols-3 atau grid-cols-4

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 7.5 Components

#### A. Search Bar

- Background: white
- Border: 1px solid gray-200, rounded-lg (rounded-xl untuk lebih soft)
- Padding: px-4 py-3
- Icon search di kiri (pakai Font Awesome/Heroicons)
- Focus state: border-indigo-500, ring-2 ring-indigo-100

#### B. Filter Pill/Button (Kategori)

**Default state:**
- Background: white
- Border: 1px solid gray-200
- Text: gray-500
- Padding: px-4 py-2, rounded-full

**Active state:**
- Background: sesuai warna kategori (indigo/emerald/amber)
- Text: white
- Border: none

**Hover state (non-active):**
- Background: gray-50
- Border: gray-300

#### C. Resource Card

- Background: white
- Border: 1px solid gray-200, rounded-xl
- Padding: p-6
- Shadow: shadow-sm default → shadow-md on hover
- Transition: transition-all duration-200
- Hover: sedikit translate-y (-2px) atau scale-[1.02] untuk efek "lift"

**Struktur dalam card:**
1. Icon/logo resource (ukuran 40x40px, rounded-lg)
2. Badge kategori (kecil, pojok atau di bawah icon) ➔ warna sesuai category accent color
3. Nama resource (H3)
4. Deskripsi (text-sm, text-gray-500, max 2 baris ➔ line-clamp-2)
5. Link "Kunjungi →" di bagian bawah card (text-indigo-500, hover underline)

#### D. Badge/Tag Kategori

- Padding: px-2.5 py-0.5
- Rounded: rounded-full
- Text: text-xs font-medium
- Background: warna category dengan opacity rendah (misal indigo-100)
- Text color: warna category yang lebih pekat (misal indigo-700)

#### E. Counter (jumlah resource per kategori)

- Ditampilkan di sebelah nama kategori dalam filter pill
- Format: "Web Development (24)"
- Style angka sedikit lebih muted/kecil dibanding nama kategori

#### F. Empty State

- Center-aligned (text-center), padding vertikal besar (py-16/py-20)
- Icon besar (misal icon search dengan opacity rendah) ukuran 48-64px
- Teks utama: text-lg font-medium text-gray-700
- Teks pendukung: text-sm text-gray-400
- Tombol Reset: style secondary button (border, bukan solid)

#### G. Buttons (General)

**Primary Button:**
- Background: indigo-500, hover: indigo-600
- Text: white, font-medium
- Padding: px-5 py-2.5, rounded-lg

**Secondary Button:**
- Background: white
- Border: 1px solid gray-300
- Text: gray-700
- Hover: bg-gray-50

### 7.6 Iconography
- Icon set utama: Font Awesome atau Heroicons (via CDN, konsisten dengan stack vanilla JS).
- Icon resource per tools: sesuai strategi di poin 6.5 (icon asli → fallback Font Awesome/Google Icons → icon generic kategori).
- Ukuran standar icon UI (search, filter, dll): 20px atau 24px.

### 7.7 Responsive Breakpoints (Tailwind default)
| Breakpoint	| Width	| Penggunaan|
|-------------|-------|-----------|
| sm	| 640px	| Mobile besar | 
| md	| 768px	| Tablet | 
| lg	| 1024px	| Desktop kecil | 
| xl	| 1280px	| Desktop besar | 

### 7.8 Animation/Transition
- Semua hover/focus state pakai transition-all duration-200 ease-in-out biar smooth, nggak kaku.
- Card hover: subtle lift effect (hover:shadow-md hover:-translate-y-0.5).
- Filter pill active: transisi warna background halus.
- (Sesuai scope, animasi tetap minimal ➔ nggak perlu animasi kompleks/library tambahan karena JS vanilla tanpa framework.)


