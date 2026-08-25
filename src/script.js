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