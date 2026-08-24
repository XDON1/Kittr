// ===== HAMBURGER TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navRight = document.getElementById('navRight');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navRight.classList.toggle('active');
});

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
