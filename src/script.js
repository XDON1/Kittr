// ===== HANDLE SEARCH =====
function handleSearch(e) {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    performSearch(query);
}

// ===== SHARED: fetch resources.json sekali, dipake bareng buat stats & filter =====
let resourcesCache = null;
let activeCategory = 'All Categories';
let allToolsData = null;
let currentToolsList = [];   // <-- baru: list lengkap hasil filter/search saat ini
let showAllCards = false;    // <-- baru: status "udah expand" atau belum

async function getResources() {
    if (resourcesCache) return resourcesCache;
    const res = await fetch('/src/assets/resources.json');
    resourcesCache = await res.json();
    allToolsData = resourcesCache;   // <-- tambahan
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
    'Web Utilities': '#7189b7',       // gray-500 #6B7280
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
    'Web Utilities': '<img src="/src/assets/images/util.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Web Utilities"/>',
    'Networking': '<span class="category-icon-svg w-4 h-4 bg-white [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]" style="-webkit-mask-image:url(/src/assets/images/network.svg); mask-image:url(/src/assets/images/network.svg);" aria-label="Networking"></span>',
    'IoT': '<img src="/src/assets/images/iot.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="IoT"/>',
    'Web Development': '<img src="/src/assets/images/web.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Web Development"/>',
    'Programming': '<img src="/src/assets/images/program.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Programming"/>',
    'Local Server': '<img src="/src/assets/images/server.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Local Server"/>',
    'Simulator': '<img src="/src/assets/images/simulator.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Simulator"/>',
    'Design': '<img src="/src/assets/images/palette.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Design"/>',
    'GitHub Repository': '<img src="/src/assets/images/github.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="GitHub Repository"/>',
    'Education & Courses': '<img src="/src/assets/images/edu.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Education & Courses"/>',
    'Scripts & Utilities': '<img src="/src/assets/images/script.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Scripts & Utilities"/>',
    'Operating Systems': '<img src="/src/assets/images/linux.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Operating Systems"/>',
    'Browsers': '<img src="/src/assets/images/browser.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Browsers"/>',
    'Security & Privacy': '<img src="/src/assets/images/privacy.svg" class="category-icon-svg w-4 h-4 brightness-0 invert" alt="Security & Privacy"/>',
};

function getCategoryIcon(category) {
    return CATEGORY_ICONS[category] || ICON_PLACEHOLDER;
}
// ===== RENDER TOOL CARDS =====

function createToolCard(toolName, toolInfo, categoryName) {
    const categoryColor = getCategoryColor(categoryName);
    return `
        <div class="group relative bg-white/5 border-2 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col" 
             style="border-color: ${categoryColor}; box-shadow: 0 0 15px ${categoryColor}33;">
            <div class="flex items-start justify-between mb-4">
                <h3 class="text-white font-bold text-lg leading-tight transition-colors group-hover:text-ds-green">
                    ${toolName}
                </h3>
                <a href="${toolInfo.link}" target="_blank" rel="noopener noreferrer" 
                   class="ml-3 shrink-0 w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200"
                   style="background-color: ${categoryColor}1A; color: ${categoryColor}; border-color: ${categoryColor}33;"
                   title="Buka ${toolName}">
                    <i class="fas fa-external-link-alt text-sm"></i>
                </a>
            </div>
            
            <p class="text-white/60 text-sm leading-relaxed flex-1">${toolInfo.desc}</p>
            
            <div class="mt-4 flex flex-wrap gap-2">
                ${toolInfo.tags.map(tag => `
                    <span class="text-[11px] font-medium px-3 py-1 rounded-full"
                          style="background-color: ${categoryColor}1A; color: ${categoryColor}; border: 1px solid ${categoryColor}33;">
                        #${tag}
                    </span>
                `).join('')}
            </div>
        </div>
    `;
}

// ===== SHOW MORE: baris awal + increment per klik, beda-beda per breakpoint =====
const CARDS_PER_ROW = { mobile: 1, tablet: 2, desktop: 3 };
const INITIAL_ROWS = { mobile: 12, tablet: 8, desktop: 6 };

// increment.first = nambah baris pas klik PERTAMA, increment.rest = nambah baris pas klik SELANJUTNYA
const INCREMENT_ROWS = {
    mobile:  { first: 12, rest: 12 },
    tablet:  { first: 6,  rest: 6 },
    desktop: { first: 4,  rest: 3 }
};

let visibleRows = 0; // baris yang lagi ditampilin sekarang, direset tiap filter/search ganti

function getBreakpoint() {
    const w = window.innerWidth;
    if (w >= 1120) return 'desktop'; // sesuaikan kalo breakpoint lg custom lu beda
    if (w >= 640) return 'tablet';
    return 'mobile';
}

function displayToolsList(list) {
    currentToolsList = list;
    const bp = getBreakpoint();
    visibleRows = INITIAL_ROWS[bp]; // reset ke jumlah baris awal tiap kali kategori/search ganti
    updateCardsDisplay();
}

function updateCardsDisplay() {
    const container = document.getElementById('toolCardsContainer');
    const emptyState = document.getElementById('toolCardsEmpty');
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (!container) return;

    if (currentToolsList.length === 0) {
        container.innerHTML = '';
        container.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        if (showMoreBtn) showMoreBtn.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    const bp = getBreakpoint();
    const limit = visibleRows * CARDS_PER_ROW[bp];
    const visible = currentToolsList.slice(0, limit);

    container.innerHTML = visible.map(({ toolName, toolInfo, category }) =>
        createToolCard(toolName, toolInfo, category)
    ).join('');

    if (showMoreBtn) {
        if (currentToolsList.length > limit) {
            showMoreBtn.classList.remove('hidden');
        } else {
            showMoreBtn.classList.add('hidden');
        }
    }
}

// Nambah baris pas tombol "Show More" diklik, sesuai increment per breakpoint
function expandVisibleRows() {
    const bp = getBreakpoint();
    const isFirstClick = visibleRows === INITIAL_ROWS[bp];
    const addRows = isFirstClick ? INCREMENT_ROWS[bp].first : INCREMENT_ROWS[bp].rest;
    visibleRows += addRows;
    updateCardsDisplay();
}

function renderToolCards(category) {
    if (!allToolsData) return;

    let toolsToRender = [];

    if (category === 'All Categories') {
        for (const cat in allToolsData) {
            for (const [toolName, toolInfo] of Object.entries(allToolsData[cat])) {
                toolsToRender.push({ toolName, toolInfo, category: cat });
            }
        }
    } else {
        if (allToolsData[category]) {
            for (const [toolName, toolInfo] of Object.entries(allToolsData[category])) {
                toolsToRender.push({ toolName, toolInfo, category: category });
            }
        }
    }

    displayToolsList(toolsToRender);
}

    // ===== SEARCH =====
function performSearch(query) {
    if (!allToolsData) return;

    if (!query) {
        renderToolCards(activeCategory);
        return;
    }

    const q = query.toLowerCase().trim();
    const results = [];

    for (const category in allToolsData) {
        for (const [toolName, toolInfo] of Object.entries(allToolsData[category])) {
            const nameMatch = toolName.toLowerCase().includes(q);
            const descMatch = toolInfo.desc.toLowerCase().includes(q);
            const tagMatch = toolInfo.tags.some(tag => tag.toLowerCase().includes(q));

            if (nameMatch || descMatch || tagMatch) {
                results.push({ toolName, toolInfo, category });
            }
        }
    }

    displayToolsList(results);
}

// ===== SET ACTIVE CATEGORY =====
function setActiveCategory(category) {
    document.querySelectorAll('.category-btn').forEach((btn) => {
        const isActive = btn.dataset.category === category;
        btn.classList.toggle('bg-ds-green', isActive);
        btn.classList.toggle('text-ds-green', isActive);
        btn.classList.toggle('text-white', !isActive);
        btn.style.borderColor = isActive ? '#a0ff5d' : btn.dataset.color;
    });

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

    // Reset search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    activeCategory = category;
    renderToolCards(category);
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

// ===== AUTO-CLOSE DROPDOWN NAVBAR PAS KLIK LINK/SHARE DI DALEMNYA =====
document.querySelectorAll('#navDropdown a').forEach((link) => {
    link.addEventListener('click', () => {
        const checkIcon = document.getElementById('check-icon');
        if (checkIcon) checkIcon.checked = false;
    });
});

// ===== INISIALISASI =====
loadCategoryStats();
loadCategoryFilters();

// Live search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        performSearch(searchInput.value.trim());
    });
}

// ===== SHOW MORE BUTTON =====
const showMoreBtn = document.getElementById('showMoreBtn');
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', expandVisibleRows);
}

// Reset balik ke baris awal kalo breakpoint berubah (misal resize/rotate device)
let resizeDebounce;
window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
        const bp = getBreakpoint();
        visibleRows = INITIAL_ROWS[bp];
        updateCardsDisplay();
    }, 200);
});


// ===== SHARE BUTTON: copy link ke clipboard =====
async function shareLink(btn) {
    const url = 'https://kittr.vercel.app/';
    const label = btn.querySelector('.share-label');
    const original = label.textContent;

    try {
        await navigator.clipboard.writeText(url);
        label.textContent = 'Link Disalin!';
    } catch (err) {
        // Fallback buat browser lama yang gak support Clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        label.textContent = 'Link Disalin!';
    }

    setTimeout(() => {
        label.textContent = original;
    }, 2000);
}