// Ambil elemen yang dibutuhkan
const hamburger = document.getElementById('hamburgerBtn');
const navCenter = document.getElementById('navCenter');
const navRight = document.getElementById('navRight');

// Saat tombol hamburger diklik, toggle class 'active'
hamburger.addEventListener('click', () => {
    navCenter.classList.toggle('active');
    navRight.classList.toggle('active');
});

// Opsional: klik di luar navbar biar menunya nutup sendiri
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(event.target)) {
        navCenter.classList.remove('active');
        navRight.classList.remove('active');
    }
});