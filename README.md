# Kittr

[![Status](https://img.shields.io/badge/Status-v1.0%20(Stable)-brightgreen?style=for-the-badge)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
---

> 🔗 **Resource Terkurasi untuk Web Utilities, Networking, IOT, Web Development, Programming, Local Server, Simulator, Design, Repository Github, Education & Course, Scripts & Mods, Web Browser, Security & Privacy**  

🔗 **Live Demo:** [Kittr](#)

---

## 🔥 Kenapa Kittr ?

- ⚡ **Langsung pakai** – nggak ada halaman "Sign Up dulu ya"
- 🌐 **Semua di browser** – nggak perlu install aplikasi tambahan
- 🧠 **Dipilih manual** – bukan sekadar list acak, tiap tools dicek dulu kegunaannya
- 🆓 **Gratis & open source** – lisensi MIT, bebas dipakai dan dikembangin

---

## 📖 Tentang Kittr

Belajar IT terasa berat ketika resource tersebar di mana-mana. **Kittr** hadir untuk mengatasi hal ini dengan menyediakan satu platform terpusat di mana pelajar dan developer bisa langsung menemukan, memfilter, dan mengakses tools, framework, serta referensi berkualitas tinggi untuk:

- 🛠️ **Web Utilities** (Converter, QR Generator, File Sharing, Torrent Tools)
- 🖥️ **Networking** (MikroTik Winbox, Cisco Packet Tracer, Protocol References)
- 📟 **IoT** (Arduino IDE, Microcontroller Platforms, Sensor Documentation)
- 🌐 **Web Development** (CSS Frameworks, Hosting, Icons, Gradient Tools)
- 💻 **Programming** (IDE, Code Editors, Development Environments)
- 🗄️ **Local Server** (XAMPP, Laragon, Local Development Stack)
- 🎮 **Simulator** (VirtualBox, Tinkercad, Network Simulation Tools)
- 🎨 **Design** (Color Palette, Archive Resources, UI Inspiration)
- 📦 **Repository GitHub** (Open Source Projects, Badges, Useful Scripts)
- 🎓 **Education & Course** (Dicoding, Coursera, Digital Talent)
- ⚙️ **Scripts & Mods** (Automation Tools, Modified Clients, Download Managers)
- 🌍 **Web Browser** (Privacy-Focused Browsers, Tor, Brave, Firefox)
- 🔐 **Security & Privacy** (VirusTotal, Encryption Tools, Dark Web Search)

Dibangun sebagai aplikasi web statis yang ringan dan cepat menggunakan **Vanilla JS + Tailwind CSS**, Kittr tidak memerlukan login dan langsung bekerja di browser. Semua data disimpan secara lokal dalam file JSON terstruktur untuk kemudahan maintenance dan akses offline.

✨ **Highlight Utama:** Tanpa backend. Tanpa dependencies. Hanya resource terkurasi murni dengan pencarian real-time dan filtering instan.

---

## ✨ Fitur

- 🔍 **Pencarian Real-time:** Filter resource berdasarkan nama, deskripsi, atau tag saat mengetik — tanpa reload halaman.
- 🗂️ **Filter Kategori Cerdas:** Single-select filtering antara 13+ kategori dengan counter live.
- 🎨 **Dark Mode First:** Estetika ramah developer dengan transisi halus (light mode akan segera hadir).
- 📱 **Fully Responsive:** Layout teroptimasi untuk mobile, tablet, dan desktop.
- 🧩 **Tampilan Auto-Grouped:** Resource otomatis diurutkan dan dikelompokkan per kategori dari data JSON.
- 🔄 **Reset Satu Klik:** Hapus pencarian/filter dan kembali ke tampilan awal secara instan.
- ⚡ **Super Cepat:** Static site tanpa panggilan API eksternal — load instan bahkan di koneksi lambat.

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|------------|
| **Struktur** | HTML5 Semantik |
| **Styling** | Tailwind CSS (Utility-First, CSS Variables untuk Theming) |
| **Logic** | Vanilla JavaScript (ES6+), DOM Manipulation, Fetch API |
| **Data** | File JSON Lokal (`resources.json`) |
| **Icons** | Font Awesome / Heroicons (via CDN) |
| **Deployment** | Static Hosting (Vercel / Netlify / GitHub Pages) |

---

## 📂 Struktur Project
```bash
kittr/
├── 📄 index.html          # Layout utama: header, search, filters, resource grid, footer
├── 🎨 style.css           # Custom overrides & CSS variables untuk theming
├── ⚙️ script.js           # Logic inti: search, filter, render, JSON fetch
├── 📦 resources.json      # Database resource terkurasi (disortir per kategori)
└── 📁 /assets             # Icons, illustrations, dan static images
```

---

## 🧠 Cara Kerja (Alur Data)
1. **Page Load** → script.js mengambil resources.json
2. **Render Awal** → Resource dikelompokkan per kategori, counter dihitung otomatis
3. **User Mengetik di Search** → Event input memicu filter real-time pada name, description, tags
4. **User Klik Kategori** → Filter single-select memperbarui tampilan, counter menyorot state aktif
5. **User Klik Resource** → Link terbuka di tab baru (target="_blank")
6. **Empty State** → Jika tidak ada hasil yang cocok, tampilkan pesan ramah + tombol reset

---