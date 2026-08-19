# PRD: WebDev Resource Hub

## 1. Overview
**Kittr:** WebDev Resource Hub

**Tipe:** Produk baru — direktori/kurasi link resource web development

**Ringkasan:**
Sebuah website yang mengumpulkan dan mengkurasi link-link resource penting untuk web development — mulai dari tools (Virtual Box, dll), library animasi CSS, framework (Bootstrap, Tailwind), dan lainnya — dalam satu tempat yang mudah dicari dan dinavigasi.

## 2. Problem Statement
Banyak orang, khususnya mahasiswa/anak Informatika, kesulitan menemukan resource web development yang tepat. Link-link berguna (framework, tools, library) tersebar di berbagai tempat (forum, grup, Twitter, dll) sehingga sulit ditemukan kembali saat dibutuhkan.

## 3. Goals & Objectives
- Menyediakan satu tempat terpusat untuk menemukan resource web dev berkualitas.
- Mempermudah pencarian resource lewat fitur search/filter.
- Menjadi referensi cepat bagi pemula maupun yang sudah berpengalaman.

### Non-Goals (di luar scope v1)
- Tidak ada sistem submit link dari user (belum di fase ini).
- Tidak ada rating/upvote/comment.
- Tidak ada sistem akun/login.

## 4. Target User
- **Primary:** Mahasiswa/pelajar Informatika atau siapapun yang belajar web development.
- **Kebutuhan mereka:** cepat nemu tools/library/framework yang relevan tanpa harus googling berkali-kali.

## 5. Fitur (Scope v1)

### 5.1 Core Features
| Fitur | Deskripsi | Prioritas |
|---|---|---|
| List Resource | Menampilkan seluruh link resource dalam bentuk card/list, dikelompokkan per kategori | Must Have |
| Search | Search bar untuk mencari resource berdasarkan nama/keyword | Must Have |
| Filter Kategori | Filter berdasarkan kategori (CSS, JS, Framework, Tools, dll) | Must Have |
| Detail per Item | Setiap item menampilkan: nama, deskripsi singkat, kategori, link keluar (external link) | Must Have |

### 5.2 Kategori (Draft — bisa didiskusikan/diedit)
Karena datanya di-hardcode di JSON, kategori sebaiknya fixed di v1, contoh starting point:
- **CSS & Animation** — library animasi CSS, generator, dll
- **CSS Framework** — Tailwind, Bootstrap, Bulma, dll
- **JS Library/Tools** — GSAP, tools JS ringan, dll
- **Dev Tools** — VirtualBox, VS Code extension, dll
- **Design/Inspiration** — Dribbble, Figma resource, dll
- **Icon & Asset** — icon library, ilustrasi gratis, dll

> Catatan: kategori ini masih draft, silakan ditambah/dikurangi/diganti sesuai isi konten yang mau dikumpulkan.

## 6. Data & Struktur Konten
Data disimpan hardcode dalam file JSON (`data.json` atau `resources.json`), contoh struktur:

```json
[
  {
    "id": "tailwindcss",
    "name": "Tailwind CSS",
    "description": "Utility-first CSS framework untuk membangun UI dengan cepat.",
    "category": "CSS Framework",
    "url": "https://tailwindcss.com",
    "tags": ["css", "framework", "utility-first"]
  }
]
```

Field wajib per item:
- `id` (unique slug)
- `name`
- `description`
- `category`
- `url`
- `tags` (opsional, untuk mendukung search lebih akurat)

## 7. User Flow
1. User membuka website → melihat list semua resource (default: semua kategori).
2. User bisa mengetik keyword di search bar → list ter-filter real-time.
3. User bisa klik kategori tertentu → list ter-filter sesuai kategori.
4. User klik salah satu item → diarahkan ke link resource asli (buka tab baru).

## 8. Tech Stack
- **HTML** — struktur halaman
- **Tailwind CSS** — styling
- **Vanilla JavaScript** — logic search, filter, render data dari JSON (tanpa framework JS seperti React/Vue)
- **Data storage** — file JSON statis (client-side, tanpa backend/database)

## 9. Non-Functional Requirements
- **Performance:** Karena data hardcode & statis, load harus cepat (tidak ada fetch ke server eksternal untuk data utama).
- **Responsive:** Tampilan harus enak dilihat di mobile & desktop (mengingat target user sering akses dari laptop kuliah/HP).
- **Aksesibilitas dasar:** Kontras warna cukup, elemen interaktif (search bar, filter button) mudah dijangkau keyboard.

## 10. Metrik Sukses (opsional untuk v1, tapi baik untuk arah ke depan)
- Jumlah resource yang berhasil dikumpulkan di v1 (target awal, misal: 50-100 link).
- Search/filter berfungsi tanpa lag untuk jumlah data tersebut.
- Feedback informal dari beberapa teman/anak Informatika (apakah membantu atau tidak).

## 11. Future Considerations (Out of Scope v1, tapi dicatat untuk roadmap)
- Fitur submit link dari user (dengan moderasi).
- Sistem rating/upvote.
- Dark mode.
- Migrasi data dari JSON hardcode ke backend/database kalau jumlah resource sudah banyak dan butuh update lebih dinamis.

## 12. Open Questions
- Apakah perlu ada halaman "About" yang menjelaskan tujuan website ini?
- Apakah tampilan default berupa grid card atau list biasa?
- Apakah nama produk "WebDev Resource Hub" sudah final, atau masih mau dipikirkan ulang?