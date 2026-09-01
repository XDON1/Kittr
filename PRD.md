# PRD (Product Requirement Document): Kittr

> **Versi:** v1.0 (Stable) — direvisi berdasarkan audit codebase aktual
> **Live Demo:** https://kittr.vercel.app

## 1. Problem Statement

Dalam proses belajar dan bekerja di dunia web development, networking, IoT, hingga bidang IT lainnya, pelajar/mahasiswa/developer sering kali membutuhkan berbagai resource pendukung — mulai dari framework CSS, tools jaringan, platform IoT, local server, hingga referensi security & privacy. Namun, resource-resource ini tersebar di banyak platform berbeda (Google, forum, grup diskusi, media sosial), sehingga:

* Sulit ditemukan kembali saat dibutuhkan.
* Memakan waktu untuk mencari resource yang relevan dan terpercaya.
* Tidak ada tempat terpusat yang mengumpulkan resource-resource ini secara terkurasi dan mudah dicari.

Akibatnya, proses belajar/kerja jadi kurang efisien karena waktu banyak terbuang untuk mencari link, bukan untuk belajar/eksplorasi materinya sendiri.

## 2. Goals & Objectives

### Goals:

- Menyediakan satu platform terpusat (**Kittr**) yang mengumpulkan resource web utilities, networking, IoT, web development, programming, local server, simulator, design, GitHub repository, education, scripts, operating systems, browser, dan security dalam satu tempat.
- Mempermudah proses pencarian resource lewat fitur search dan filter kategori, sehingga user tidak perlu mencari manual di berbagai sumber.
- Memastikan resource yang ditampilkan sudah terkurasi (dipilih manual, bukan sembarang link) sehingga kualitasnya terjaga.
- Membuka opsi dukungan sukarela (donasi) dari user untuk keberlanjutan pengembangan Kittr.

### Objectives (target yang lebih terukur/spesifik):

- Menyediakan 100+ resource pilihan (saat ini: **116 resource** tersebar di 14 kategori).
- User bisa menemukan resource yang dicari dalam waktu kurang dari 10 detik lewat search/filter.
- Website bisa diakses dengan baik di desktop maupun mobile (fully responsive), termasuk pengalaman berbeda yang dioptimalkan per breakpoint (mobile/tablet/desktop).
- Tanpa proses sign-up/login — user langsung bisa pakai begitu buka halaman.

## 3. Target Users

### Primary User:

- Pelajar/mahasiswa dari jurusan Informatika, TKJ (Teknik Komputer Jaringan), RPL (Rekayasa Perangkat Lunak), atau bidang IT terkait lainnya.
- Developer, hobbyist, dan siapa pun yang bekerja atau penasaran dengan dunia web, networking, IoT, dan security.
- Level pengalaman: **Pemula hingga Menengah.**

### Karakteristik User:

- Terbiasa browsing/googling untuk cari referensi belajar/kerja tugas/project.
- Butuh akses cepat ke tools/resource tanpa proses ribet (nggak mau daftar akun, login, dll).
- Kemungkinan besar akses dari laptop saat kerja/belajar, tapi bisa juga cek cepat dari HP.
- Kebutuhan bervariasi tergantung minat: ada yang butuh resource web dev (CSS, framework), ada yang butuh resource networking, ada yang butuh resource IoT, security, dsb.

### Use Case Utama:

- "Saya lagi ngerjain project web dan butuh cari framework CSS yang bagus" → filter kategori Web Development.
- "Saya anak TKJ, lagi cari tools buat simulasi jaringan" → filter kategori Networking / Simulator.
- "Saya lagi belajar IoT, butuh referensi microcontroller/platform" → filter kategori IoT.
- "Saya butuh distro Linux atau OS alternatif buat belajar" → filter kategori Operating Systems.
- "Saya baru denger nama tools X, mau tau itu apa" → search nama tools, ketemu deskripsi singkat + tag + link.
- "Saya ngerasa Kittr ngebantu, mau ikut support" → scroll ke section Dukung Kittr, scan QRIS.

## 4. Functional Requirements

### FR-1: Menampilkan Daftar Resource

- Sistem menampilkan resource dalam bentuk card di dalam grid, dengan data diambil secara asynchronous dari `resources.json`.
- Setiap card menampilkan: nama resource, deskripsi singkat, tag (bisa lebih dari satu), dan tombol link menuju resource asli (ikon external-link).
- Warna border, shadow, dan aksen tag pada tiap card mengikuti warna kategori resource tersebut.

### FR-2: Pencarian (Search)

- User dapat mencari resource lewat search bar berdasarkan nama, deskripsi, atau tag.
- Pencarian bersifat real-time, case-insensitive, dan mencakup seluruh kategori (tidak dibatasi kategori aktif) saat query terisi.
- Hasil pencarian mereset tampilan "Show More" (baris yang ditampilkan kembali ke jumlah awal).

### FR-3: Filter Kategori (Single-Select)

- User dapat memfilter resource berdasarkan satu kategori dari 14 kategori yang tersedia (lihat 6.4), ditambah opsi "All Categories".
- Memilih kategori lain otomatis mengganti filter sebelumnya (bukan menambah/multi-select).
- Tampilan filter berbeda per device: **button grid** untuk desktop/tablet (≥ `sm` breakpoint), **dropdown** untuk mobile (< `sm` breakpoint).

### FR-4: Navigasi ke Resource Eksternal

- Saat user klik tombol link pada card, sistem membuka URL resource tersebut di tab baru (`target="_blank"`, `rel="noopener noreferrer"`).

### FR-5: Empty State

- Jika hasil pencarian/filter tidak menemukan resource yang cocok, sistem menyembunyikan grid card dan menampilkan empty state di elemen `#toolCardsEmpty`.
- Tombol "Show More" ikut disembunyikan saat empty state aktif.

### FR-6: Kategorisasi Data

- Setiap resource tersimpan dalam struktur JSON nested per kategori (`{ "Kategori": { "Nama Resource": { desc, link, tags } } }`), sehingga otomatis terkelompok berdasarkan key kategori.

### FR-7: Statistik Kategori (Category Stats)

- Sistem menampilkan statistik jumlah & persentase resource per kategori dalam bentuk bar chart ganda (mirrored bar — dua kolom kiri/kanan) di section hero.
- Data statistik dihitung otomatis dari jumlah resource di tiap kategori pada `resources.json` (tidak hardcode).
- Setiap bar kategori memakai warna aksen sesuai kategori tersebut.

### FR-8: Progressive Loading ("Show More")

- Sistem tidak menampilkan seluruh resource sekaligus; jumlah baris awal yang tampil berbeda per breakpoint (mobile: 12 baris, tablet: 8 baris, desktop: 6 baris).
- Tombol "Show More" menambah baris yang ditampilkan secara incremental, dengan jumlah increment berbeda antara klik pertama dan klik berikutnya, serta berbeda per breakpoint.
- Tombol "Show More" otomatis hilang saat seluruh resource pada hasil filter/search sudah ditampilkan.
- Jumlah baris yang ditampilkan (`visibleRows`) direset ke nilai awal setiap kali kategori atau query pencarian berubah.

### FR-9: Particle Text Effect (Hero Title)

- Pada desktop (breakpoint `lg` ke atas), judul "Kittr" di hero section ditampilkan sebagai efek partikel interaktif berbasis `<canvas>`.
- Efek ini bersifat dekoratif dan interaktif terhadap kursor; disembunyikan pada mobile/tablet (fallback ke teks statis "Kittr").

### FR-10: Section Donasi (Dukung Kittr)

- Sistem menyediakan section donasi berisi kode QRIS yang dapat di-scan atau di-download langsung (`download="Kittr-QRIS.png"`).
- Tampilan donasi berbeda antara mobile/tablet (QRIS + tombol download saja) dan desktop (QRIS + teks penjelasan donasi bersebelahan).

### FR-11: Navigasi & Responsive Menu

- Navbar menyediakan menu navigasi utama, search bar, dan hamburger menu untuk mobile.
- Hamburger menu membuka dropdown menu berisi navigasi, menggunakan animasi transisi (checkbox-based toggle, tanpa JavaScript tambahan untuk animasi ikon).

## 5. Product Scope

### In Scope (v1):

- Website statis (HTML + Tailwind CSS + Vanilla JavaScript), tanpa backend/database.
- Data resource disimpan di file `resources.json` (116 resource, 14 kategori).
- Fitur: tampilkan resource by category, search real-time (lintas kategori), filter kategori single-select (button desktop / dropdown mobile), progressive loading ("Show More"), empty state, statistik kategori (mirrored bar chart), particle text effect pada hero (desktop), section donasi (QRIS).
- Kategori mencakup 14 kategori utama tanpa sub-kategori (lihat daftar lengkap di poin 6.4).
- Responsive design dengan pengalaman berbeda per breakpoint (mobile/tablet/desktop), termasuk perilaku "Show More" dan filter kategori yang disesuaikan per device.
- Konten campur Bahasa Indonesia & English (menyesuaikan istilah teknis yang lazim dipakai serta target audiens internasional pada beberapa copy).
- Version control & collab pakai GitHub.
- Deploy sebagai static site via Vercel.
- Dark mode (tema utama & satu-satunya di v1 — bertema hitam pekat + neon green).

### Out of Scope (v1.x → masuk Future Considerations):

- Fitur submit link dari user (community-driven).
- Rating/upvote/comment system.
- Light mode toggle.
- Backend & database (semua masih hardcode JSON).
- Search lanjutan (advanced filter multi-kategori, filter by tag spesifik).
- Multi-select filter kategori.

## 6. Features & Requirements

### 6.1 Navbar & Hero Section

Deskripsi: Navbar sticky berisi logo, menu navigasi, dan search bar. Hero section berisi judul produk, tagline, dan statistik kategori.

**Requirement:**

- Navbar sticky di top halaman, dengan border/glow aksen warna `--ds-green`.
- Logo "Kittr" tampil sebagai teks statis (mobile/tablet) atau efek particle canvas interaktif (desktop, `lg` breakpoint ke atas).
- Tagline singkat menjelaskan Kittr sebagai direktori tools, situs, dan resource untuk dunia web.
- Search bar terintegrasi di navbar, dapat di-toggle (expand/collapse) lewat tombol search di mobile.
- Statistik kategori (mirrored bar chart kiri-kanan) ditampilkan berdampingan dengan hero title pada desktop.

### 6.2 Search Bar

Deskripsi: Input pencarian resource berdasarkan nama/deskripsi/tag.

**Requirement:**

- Search bekerja real-time (setiap kali user mengetik, list langsung ter-filter via input event, tanpa perlu tombol submit — meski form tetap punya `onsubmit` handler sebagai fallback).
- Search mencocokkan berdasarkan nama resource, deskripsi (`desc`), dan tags.
- Search bersifat case-insensitive dan mengabaikan whitespace di awal/akhir query.
- Search mencari lintas semua kategori (tidak terbatas kategori yang sedang aktif difilter).
- Search input memiliki tombol clear/cancel bawaan (custom-styled via CSS, ikon "X" berwarna aksen hijau).

### 6.3 Kategori & Filter Navigation

Deskripsi: Daftar kategori yang bisa diklik untuk memfilter resource (single-select).

**Requirement:**

- **Desktop/Tablet (≥ `sm`):** Ditampilkan sebagai grid button, masing-masing dengan ikon kategori + nama.
- **Mobile (< `sm`):** Ditampilkan sebagai dropdown dengan label kategori aktif dan chevron indikator, membuka daftar kategori saat diklik.
- Kategori "All Categories" jadi default state saat halaman pertama dibuka, dengan ikon grid 4-kotak.
- Kategori yang aktif/dipilih memiliki visual state berbeda, mengikuti warna aksen kategori tersebut.
- Setiap tombol/opsi kategori menampilkan ikon representatif (SVG/image custom per kategori, fallback ke ikon placeholder generic jika kategori baru belum didaftarkan iconnya).

### 6.4 Daftar Kategori

**Requirement:**

- Tidak ada sub-kategori — filter bersifat flat, 14 kategori sejajar + "All Categories".
- Setiap resource memiliki satu kategori sebagai key induk di struktur `resources.json`.
- Daftar kategori final beserta jumlah resource dan warna aksennya (per kondisi data saat ini):

| No | Kategori | Jumlah Resource | Warna Aksen (Hex) |
|---|---|---|---|
| 1 | Web Utilities | 30 | `#7189B7` |
| 2 | Networking | 2 | `#10B981` |
| 3 | IoT | 1 | `#A855F7` |
| 4 | Web Development | 14 | `#3B82F6` |
| 5 | Programming | 6 | `#EAB308` |
| 6 | Local Server | 2 | `#EF4444` |
| 7 | Simulator | 3 | `#6366F1` |
| 8 | Design | 2 | `#EC4899` |
| 9 | GitHub Repository | 13 | `#708238` |
| 10 | Education & Courses | 3 | `#F97316` |
| 11 | Scripts & Utilities | 17 | `#14B8A6` |
| 12 | Operating Systems | 9 | `#F43F5E` |
| 13 | Browsers | 4 | `#06B6D4` |
| 14 | Security & Privacy | 10 | `#22C55E` |

> **Total: 116 resource.** Kategori baru yang belum terdaftar warnanya otomatis fallback ke `--ds-green` (`#a0ff5d`) sebagai default color.

### 6.5 Resource Card → Icon & Tag Strategy

**Requirement:**

- Card **tidak** menampilkan icon/logo per-resource individual — strategi icon "cari logo asli tiap tools" pada rencana awal **tidak diimplementasikan** di v1.
- Sebagai gantinya, identitas visual card dibangun lewat kombinasi: warna border kategori, glow shadow warna kategori, dan tombol external-link berwarna kategori.
- Tiap card menampilkan tag (bisa lebih dari satu) dalam bentuk pill kecil berwarna aksen kategori, diawali simbol `#`.
- Ikon kategori (bukan ikon per-resource) dipakai di tombol filter dan dropdown kategori, berbasis SVG/image custom per kategori yang disimpan di `/src/assets/images/`.

### 6.6 Empty State

Deskripsi: Tampilan saat hasil search/filter kosong.

**Requirement:**

- Ditampilkan di elemen `#toolCardsEmpty`, center-aligned, dengan teks berwarna muted (`text-white/50`).
- Grid card (`#toolCardsContainer`) disembunyikan bersamaan saat empty state aktif.
- Tombol "Show More" ikut disembunyikan saat empty state aktif.

### 6.7 Progressive Loading ("Show More")

Deskripsi: Mekanisme menampilkan resource secara bertahap, bukan sekaligus semua.

**Requirement:**

- Jumlah baris awal berbeda per breakpoint: mobile 12 baris, tablet 8 baris, desktop 6 baris.
- Kolom card per baris (`CARDS_PER_ROW`) mengikuti breakpoint: mobile 1 kolom, tablet 2 kolom, desktop 3 kolom.
- Klik "Show More" menambah baris sesuai konfigurasi increment (berbeda antara klik pertama dan klik berikutnya, serta berbeda per breakpoint).
- Breakpoint ditentukan lewat lebar window: `< 640px` = mobile, `640–1119px` = tablet, `≥ 1120px` = desktop.
- Jumlah baris yang ditampilkan (`visibleRows`) direset ke nilai awal breakpoint tiap kali filter kategori atau query search berubah.

### 6.8 Section Donasi (Dukung Kittr)

Deskripsi: Section untuk mendukung pengembangan Kittr lewat donasi QRIS.

**Requirement:**

- **Mobile & Tablet:** Menampilkan gambar QRIS dan tombol download QRIS saja (layout ringkas).
- **Desktop:** Menampilkan QRIS (1/3 lebar) berdampingan dengan teks penjelasan donasi (2/3 lebar), termasuk ajakan dan ucapan terima kasih.
- Tombol download QRIS menghasilkan file bernama `Kittr-QRIS.png`.

### 6.9 Footer

Deskripsi: Bagian bawah halaman.

**Requirement:**

- Menampilkan nama produk (Kittr) beserta deskripsi singkat (versi Bahasa Inggris untuk audiens internasional).
- Link ke GitHub repository resmi Kittr.
- Kredit pembuat/kontributor.
- Copyright notice dengan tahun berjalan.

## 7. Design System

### 7.1 Design Principles

- **Bold & Minimal** → tema gelap pekat dengan satu warna aksen neon yang mencolok, fokus ke kontras tinggi dan keterbacaan.
- **Developer-friendly aesthetic** → nuansa "terminal/hacker" yang familiar buat anak IT, memakai warna hijau neon sebagai identitas khas.
- **Consistent per-category identity** → setiap kategori punya warna aksen sendiri yang dipakai konsisten di card, tag, filter button, dan stats chart.

### 7.2 Color Palette

**Base CSS Variables (satu-satunya tema — dark, tidak ada light mode di v1):**

```css
:root {
    --bg-primary: #000000;      /* Hitam pekat — background utama halaman */
    --ds-green: #a0ff5d;        /* Neon green — warna identitas & aksen utama */
    --text-primary: #ffffff;    /* Putih — teks utama/judul */
    --text-secondary: #a0ff5d;  /* Neon green — teks aksen/interaktif */
    --text-muted: #333333;      /* Abu gelap — teks non-aktif */
}
```

> Catatan: Tema ini **berbeda total** dari rencana desain awal (Slate/Indigo berbasis Tailwind default). Palet aktual memakai hitam solid sebagai base dan hijau neon (`#a0ff5d`) sebagai satu-satunya warna aksen utama brand, dikombinasikan dengan warna aksen unik per kategori (lihat 7.2.1).

**Elemen transparansi (dipakai luas di card & badge):**

- Background semi-transparan: `bg-white/5`, `bg-black/50` — dipakai untuk card, dropdown, dan overlay.
- Border semi-transparan berbasis warna aksen: contoh `rgba(160,255,93,0.25)` (border navbar), atau warna kategori + alpha hex (`{color}33`, `{color}1A`) untuk border/background card & tag.

### 7.2.1 Category Accent Colors (14 Kategori)

Setiap kategori punya warna identitas sendiri (lihat tabel lengkap di 6.4), dipakai konsisten untuk:

- Border & glow shadow pada resource card.
- Background & text color pada tag/badge di dalam card.
- Warna bar pada statistik kategori (mirrored bar chart).
- Ikon kategori pada tombol filter (lewat `currentColor`/mask, mengikuti warna teks parent).

Kategori baru yang belum didaftarkan warnanya akan otomatis fallback ke `DEFAULT_CATEGORY_COLOR` (`#a0ff5d`, sama dengan `--ds-green`).

### 7.3 Typography

Font Family:

- **Body & UI:** `Segoe UI, Tahoma, Geneva, Verdana, sans-serif` (system font stack, bukan Google Fonts custom).
- **Icon set:** Font Awesome (dipakai untuk ikon UI seperti chevron, external-link, search).

> Catatan: Rencana awal memakai Inter/Poppins via Google Fonts tidak diimplementasikan — v1 memakai system font stack untuk performa loading yang lebih cepat.

### 7.4 Spacing & Layout

**Container:**

- Navbar & konten utama: `max-w-[1400px]`, center dengan `mx-auto`, lebar responsif `94vw` (mobile) hingga fixed max-width (desktop).

**Grid System (Resource Card):**

- Mobile: `grid-cols-1`
- Tablet (`sm`): `grid-cols-2`
- Desktop (`lg`): `grid-cols-3`

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Breakpoint kustom untuk logika "Show More" (JavaScript, bukan Tailwind default):**

- Mobile: `< 640px`
- Tablet: `640px – 1119px`
- Desktop: `≥ 1120px`

### 7.5 Components

#### A. Navbar & Search Bar

- Navbar: sticky, rounded (`rounded-[20px]` desktop / `rounded-[14px]` mobile), border neon-green semi-transparan, shadow gelap dengan inset highlight.
- Search bar: terintegrasi di navbar, dapat di-toggle di mobile lewat tombol search, custom clear button berwarna `--ds-green`.

#### B. Filter Button/Dropdown (Kategori)

**Desktop/Tablet — Button:**
- Ditampilkan grid button dengan ikon + label kategori.
- Active state: warna aksen sesuai kategori terkait.

**Mobile — Dropdown:**
- Border 2px semi-transparan neon-green, rounded-2xl.
- Menampilkan label kategori aktif + chevron yang berotasi saat dropdown terbuka.
- List dropdown: background hitam solid, border neon-green semi-transparan, shadow gelap, scrollable (`max-h-72 overflow-y-auto`).

#### C. Resource Card

- Background: `bg-white/5` (semi-transparan di atas hitam).
- Border: 2px solid warna kategori, rounded-2xl (`rounded-2xl`).
- Shadow: glow effect memakai warna kategori dengan alpha rendah (`{color}33`).
- Hover: `scale-[1.02]` dengan transisi halus (`transition-all duration-300`).

**Struktur dalam card:**
1. Nama resource (H3, bold, berubah warna ke `--ds-green` saat hover/group-hover).
2. Tombol external-link bulat di pojok kanan atas, berwarna aksen kategori.
3. Deskripsi resource (`text-white/60`, text-sm).
4. Daftar tag di bagian bawah card, masing-masing sebagai pill kecil berwarna aksen kategori, diawali `#`.

#### D. Tag/Badge

- Padding: `px-3 py-1`, rounded-full.
- Text: `text-[11px]`, font-medium.
- Background & text color: warna kategori dengan alpha (`{color}1A` untuk background, `{color}` solid untuk teks, border `{color}33`).

#### E. Category Stats (Mirrored Bar Chart)

- Ditampilkan berdampingan (kiri "normal", kanan "mirror") di hero section pada desktop.
- Setiap bar mewakili satu kategori, panjang bar proporsional terhadap kategori dengan jumlah resource terbanyak (`maxCount`).
- Warna bar mengikuti warna aksen kategori masing-masing.

#### F. Empty State

- Center-aligned, warna teks muted (`text-white/50`).
- Ditampilkan menggantikan grid card saat hasil filter/search kosong.

#### G. Show More Button

- Style: border 2px semi-transparan neon-green, `rounded-full`, background transparan.
- Hover: berubah menjadi solid background `--ds-green` dengan teks hitam.
- Disembunyikan otomatis saat seluruh resource hasil filter sudah tertampil, atau saat empty state aktif.

#### H. Donate Section (QRIS)

- Gambar QRIS ditampilkan dengan tombol download di bawahnya (mobile/tablet) atau di samping teks penjelasan (desktop).
- Tombol download: style konsisten dengan tombol sekunder aplikasi (border neon-green).

### 7.6 Iconography

- Icon set UI utama: **Font Awesome** (chevron, external-link, search icon, dll — via CDN).
- Icon kategori: SVG/image custom per kategori, disimpan lokal di `/src/assets/images/` (contoh: `util.svg`, `network.svg`, `iot.svg`, dll), sebagian besar diberi filter `brightness-0 invert` agar tampil putih, sebagian dipakai sebagai CSS mask agar mewarisi `currentColor`.
- Icon kategori "All Categories" & fallback placeholder dibuat sebagai inline SVG langsung di JavaScript (bukan file terpisah).
- Ukuran standar icon kategori: 14–16px.

### 7.7 Responsive Breakpoints

| Breakpoint | Width | Penggunaan | Catatan |
|---|---|---|---|
| Mobile | < 640px | Layout mobile, dropdown kategori, 1 kolom card | Custom JS breakpoint, selaras dengan Tailwind `sm` |
| Tablet | 640px – 1119px | 2 kolom card, filter button muncul | Custom JS breakpoint (bukan `md`/`lg` default Tailwind) |
| Desktop | ≥ 1120px | 3 kolom card, particle title effect aktif, layout donasi bersebelahan | Custom JS breakpoint, mendekati `lg` Tailwind namun disesuaikan manual |

> Catatan penting: Breakpoint logika JavaScript (`getBreakpoint()`) memakai nilai kustom (`640px`, `1120px`), **tidak identik** dengan breakpoint default Tailwind (`sm: 640px`, `lg: 1024px`) — perbedaan ini perlu diperhatikan saat ada perubahan layout agar CSS dan JS tetap sinkron.

### 7.8 Animation/Transition

- Card hover: `scale-[1.02]` dengan `transition-all duration-300`.
- Filter dropdown mobile: transisi opacity + translate-y saat membuka/menutup (`transition-all duration-300 ease-out`).
- Navbar dropdown & hamburger icon: animasi custom berbasis CSS variable (`--pos-y-bar-one`, `--rotate-bar-one`, dst.), di-trigger lewat checkbox `:checked` (teknik CSS-only, tanpa JavaScript).
- Chevron dropdown kategori: rotasi 180° saat dropdown terbuka (`transition-transform duration-200`).
- Particle text effect: animasi partikel interaktif berbasis canvas, merespons pergerakan kursor (file terpisah `particleText.js`).