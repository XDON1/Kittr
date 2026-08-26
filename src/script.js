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

// ===== STATS KATEGORI (HERO SECTION) =====

// Item versi normal (kolom kanan): nama di kiri, angka di kanan, bar mulai dari kiri
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

// Item versi mirror (kolom kiri): nama di kanan, angka di kiri, bar mulai/nempel dari kanan
function renderStatMirror(category, count, percent) {
    return `
        <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-sm text-white flex-row-reverse">
                <span class="font-semibold">${category}</span>
                <span class="text-ds-green font-bold">${count}</span>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden flex justify-end">
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
        const res = await fetch('/src/assets/resources.json');
        const data = await res.json();

        // Hitung jumlah tools per kategori (urutan tetep ngikut JSON asli, gak di-sort)
        const stats = Object.entries(data).map(([category, tools]) => ({
            category,
            count: Object.keys(tools).length
        }));

        const maxCount = Math.max(...stats.map((s) => s.count), 1);

        // Bagi 2: separuh pertama ke kolom kiri (mirror), sisanya ke kolom kanan (normal)
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

loadCategoryStats();