// ===== HANDLE SEARCH =====
function handleSearch(e) {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query) {
        alert('Searching for: "' + query + '"');
        // Di sini bisa diarahkan ke halaman hasil search
        // window.location.href = '/search?q=' + encodeURIComponent(query);
    }
}

// ===== SHARED: fetch resources.json sekali, dipake bareng buat stats & filter =====
let resourcesCache = null;

async function getResources() {
    if (resourcesCache) return resourcesCache;
    const res = await fetch('/src/assets/resources.json');
    resourcesCache = await res.json();
    return resourcesCache;
}

// ===== STATS KATEGORI (HERO SECTION) =====

// Item versi normal (kolom kanan, & default di mobile): nama di kiri, angka di kanan, bar mulai dari kiri
function renderStatNormal(category, count, percent) {
    return `
        <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-sm text-white">
                <span class="font-semibold">${category}</span>
                <span class="text-ds-green font-bold">${count}</span>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-ds-green rounded-full transition-all duration-700 ease-out" style="width:${percent}%"></div>
            </div>
        </div>
    `;
}

// Item versi mirror (kolom kiri): nama di kanan, angka di kiri, bar mulai/nempel dari kanan.
// Class mirror-nya di-gate di belakang "sm:" doang, jadi begitu masuk mobile (1 kolom),
// otomatis balik jadi rata kiri normal kayak kolom kanan.
function renderStatMirror(category, count, percent) {
    return `
        <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-sm text-white sm:flex-row-reverse">
                <span class="font-semibold">${category}</span>
                <span class="text-ds-green font-bold">${count}</span>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden sm:flex sm:justify-end">
                <div class="h-full bg-ds-green rounded-full transition-all duration-700 ease-out" style="width:${percent}%"></div>
            </div>
        </div>
    `;
}

async function loadCategoryStats() {
    const leftContainer = document.getElementById('statsLeft');
    const rightContainer = document.getElementById('statsRight');
    if (!leftContainer || !rightContainer) return;

    try {
        const data = await getResources();

        // Hitung jumlah tools per kategori (urutan tetep ngikut JSON asli, gak di-sort)
        const stats = Object.entries(data).map(([category, tools]) => ({
            category,
            count: Object.keys(tools).length
        }));

        const maxCount = Math.max(...stats.map((s) => s.count), 1);

        // Bagi 2: separuh pertama ke kolom kiri (mirror di desktop), sisanya ke kolom kanan (normal)
        const half = Math.ceil(stats.length / 2);
        const leftStats = stats.slice(0, half);
        const rightStats = stats.slice(half);

        leftContainer.innerHTML = leftStats.map(({ category, count }) => {
            const percent = Math.round((count / maxCount) * 100);
            return renderStatMirror(category, count, percent);
        }).join('');

        rightContainer.innerHTML = rightStats.map(({ category, count }) => {
            const percent = Math.round((count / maxCount) * 100);
            return renderStatNormal(category, count, percent);
        }).join('');
    } catch (err) {
        console.error('Gagal load resources.json:', err);
        leftContainer.innerHTML = '<p class="text-white/40 text-sm">Gagal memuat data kategori.</p>';
    }
}

// ===== FILTER KATEGORI (BUTTON + DROPDOWN) =====

// Warna border FIX per kategori (bukan random lagi). Key HARUS sama persis
// (case-sensitive) sama nama kategori di resources.json.
const CATEGORY_COLORS = {
    'Web Utilities': '#6B7280',       // gray-500
    'Networking': '#10B981',          // emerald-500
    'IoT': '#A855F7',                 // purple-500
    'Web Development': '#3B82F6',     // blue-500
    'Programming': '#EAB308',         // yellow-500
    'Local Server': '#EF4444',        // red-500
    'Simulator': '#6366F1',           // indigo-500
    'Design': '#EC4899',              // pink-500
    'GitHub Repository': '#708238',   // olive-500
    'Education & Courses': '#F97316', // orange-500
    'Scripts & Utilities': '#14B8A6', // teal-500
    'Operating Systems': '#F43F5E',   // rose-500
    'Browsers': '#06B6D4',            // cyan-500
    'Security & Privacy': '#22C55E',  // green-500
};

const DEFAULT_CATEGORY_COLOR = '#a0ff5d'; // fallback kalo ada kategori baru yang belom didaftarin di atas

function getCategoryColor(category) {
    return CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
}

// ===== SLOT SVG ICON (khusus button & dropdown, gak dipake di stats) =====
// Taruh SVG kategori di sini, key-nya harus sama persis kayak nama kategori di JSON.
// Yang belom didaftarin bakal jatuh ke ICON_PLACEHOLDER.
// Semua SVG pake currentColor biar otomatis ngikutin warna teks parent-nya.
const ICON_PLACEHOLDER = `
    <svg class="category-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
    </svg>
`;

const ICON_ALL = `
    <svg class="category-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/>
    </svg>
`;

const CATEGORY_ICONS = {
    'All Categories': ICON_ALL,
    // 'Web Utilities': `<svg ...>...</svg>`,
    // 'Networking': `<svg ...>...</svg>`,
    // dst — tinggal tambahin per kategori di sini, kalo kosong bakal pake placeholder
};

function getCategoryIcon(category) {
    return CATEGORY_ICONS[category] || ICON_PLACEHOLDER;
}

function setActiveCategory(category) {
    // Update tampilan tombol (tablet/desktop)
    document.querySelectorAll('.category-btn').forEach((btn) => {
        const isActive = btn.dataset.category === category;
        btn.classList.toggle('bg-ds-green', isActive);
        btn.classList.toggle('text-ds-green', isActive);
        btn.classList.toggle('text-white', !isActive);
        // Border ikut jadi ds-green pas aktif, balik ke warna kategori aslinya pas gak aktif
        btn.style.borderColor = isActive ? '#a0ff5d' : btn.dataset.color;
    });

    // Update tampilan dropdown (mobile)
    const label = document.getElementById('categoryDropdownLabel');
    if (label) label.textContent = category;

    document.querySelectorAll('.category-option').forEach((opt) => {
        const isActive = opt.dataset.category === category;
        const check = opt.querySelector('.category-check');
        if (check) check.style.visibility = isActive ? 'visible' : 'hidden';
        opt.classList.toggle('text-ds-green', isActive);
        opt.classList.toggle('font-bold', isActive);
    });

    closeCategoryDropdown();

    // TODO: hubungin ke logic filter kotak-kotak kategori kalo section-nya udah ada
}

function closeCategoryDropdown() {
    const list = document.getElementById('categoryDropdownList');
    const chevron = document.getElementById('categoryDropdownChevron');
    if (!list) return;
    list.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
}

async function loadCategoryFilters() {
    const buttonsContainer = document.getElementById('categoryButtons');
    const dropdownList = document.getElementById('categoryDropdownList');
    const dropdownBtn = document.getElementById('categoryDropdownBtn');
    const dropdownChevron = document.getElementById('categoryDropdownChevron');
    if (!buttonsContainer || !dropdownList) return;

    try {
        const data = await getResources();
        const categories = ['All Categories', ...Object.keys(data)];

        // ===== TOMBOL (tablet & desktop) =====
        buttonsContainer.innerHTML = categories.map((category) => {
            const color = category === 'All Categories' ? '#000' : getCategoryColor(category);
            return `
                <button
                    type="button"
                    class="category-btn flex items-center gap-2 px-5 py-2 rounded-full border-2 bg-white/5 text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style="border-color:${color}"
                    data-category="${category}"
                    data-color="${color}"
                >${getCategoryIcon(category)}<span>${category}</span></button>
            `;
        }).join('');

        buttonsContainer.querySelectorAll('.category-btn').forEach((btn) => {
            btn.addEventListener('click', () => setActiveCategory(btn.dataset.category));
        });

        // ===== DROPDOWN (mobile) =====
        dropdownList.innerHTML = categories.map((category) => `
            <button
                type="button"
                class="category-option w-full flex items-center gap-2 text-left text-white text-sm px-5 py-3 hover:bg-[rgba(160,255,93,0.1)] transition-colors duration-150"
                data-category="${category}"
            >
                ${getCategoryIcon(category)}
                <span class="flex-1">${category}</span>
                <i class="fas fa-check category-check text-ds-green" style="visibility:hidden"></i>
            </button>
        `).join('');

        dropdownList.querySelectorAll('.category-option').forEach((opt) => {
            opt.addEventListener('click', () => setActiveCategory(opt.dataset.category));
        });

        // Default: "All Categories" aktif
        setActiveCategory('All Categories');

        // Toggle buka/tutup dropdown
        dropdownBtn.addEventListener('click', () => {
            const isHidden = dropdownList.classList.contains('hidden');
            if (isHidden) {
                dropdownList.classList.remove('hidden');
                dropdownChevron.classList.add('rotate-180');
            } else {
                closeCategoryDropdown();
            }
        });

        // Klik di luar dropdown -> nutup
        document.addEventListener('click', (e) => {
            const wrapper = document.getElementById('categoryDropdownWrapper');
            if (wrapper && !wrapper.contains(e.target)) {
                closeCategoryDropdown();
            }
        });
    } catch (err) {
        console.error('Gagal load resources.json (filter kategori):', err);
        buttonsContainer.innerHTML = '<p class="text-white/40 text-sm">Gagal memuat kategori.</p>';
    }
}

loadCategoryStats();
loadCategoryFilters();