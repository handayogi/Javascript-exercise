// Mengambil elemen dengan ID `menu-icon` dan class `nav-list`
let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

// Menambahkan event click pada icon untuk menampilkan/menghilangkan daftar navigasi
menu.onclick = () => {
    menu.classList.toggle('bx-x'); // Mengubah icon menu menjadi bentuk "X" saat aktif
    navList.classList.toggle('open'); // Membuka atau menutup daftar navigasi/menu
};

// inisialisasi library ScrollReveal dengan pengaturan animasi
const sr = ScrollReveal ({
    distance: '100px', // jarak animasi
    duration: 2000, // durasi animasi 'ms'
    delay: 300, // delay sebelum animasi dimulai
    reset: true // animasi akan direset setiap kali elemen muncul kembali
});

// mengatur animasi pada elemen dengan class `hero-text`, `hero-img`, dan `sosmed`
sr.reveal('.hero-text', {delay: 200, origin: 'top'});
sr.reveal('.hero-img', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});