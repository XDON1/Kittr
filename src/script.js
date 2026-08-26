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
async function loadCategoryStats() {
    const container = document.getElementById('statsContainer');
    if (!container) return;

    try {
        const res = await fetch('/src/assets/resources.json');
        const data = await res.json();

        // Hitung jumlah tools per kategori
        const stats = Object.entries(data).map(([category, tools]) => ({
            category,
            count: Object.keys(tools).length
        }));

        // Urutin dari yang paling banyak toolsnya
        stats.sort((a, b) => b.count - a.count);

        const maxCount = Math.max(...stats.map((s) => s.count), 1);

        container.innerHTML = stats.map(({ category, count }) => {
            const percent = Math.round((count / maxCount) * 100);
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
        }).join('');
    } catch (err) {
        console.error('Gagal load categories.json:', err);
        container.innerHTML = '<p class="text-white/40 text-sm">Gagal memuat data kategori.</p>';
    }
}

loadCategoryStats();