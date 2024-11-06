// Menambahkan event listener untuk memvalidasi input setiap kali pengguna mengetik atau mengubah nilai
document.getElementById('username').addEventListener('keyup', validateUsername);
document.getElementById('email').addEventListener('change', validateEmail);
document.getElementById('password').addEventListener('keyup', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);

// Fungsi untuk memvalidasi username
function validateUsername() {
    const username = document.getElementById('username').value; // Mengambil nilai input username
    const error = document.getElementById('usernameError'); // Element untuk menampilkan pesan error
    const usernamePattern = /^[a-zA-Z0-9]{5,20}$/; // Pola validasi: 5-20 karakter alfanumerik

    if (!usernamePattern.test(username)) {
        // Tampilkan error jika username tidak sesuai pola
        error.textContent = "Username harus 5-20 karakter alfanumerik.";
        error.style.display = 'block';
        return false;
    } else {
        // Sembunyikan error jika validasi berhasil
        error.style.display = 'none';
        return true;
    }
}

// Fungsi untuk memvalidasi email
function validateEmail() {
    const email = document.getElementById('email').value; // Mengambil nilai input email
    const error = document.getElementById('emailError'); // Element untuk menampilkan pesan error
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Pola validasi email sederhana

    if (!emailPattern.test(email)) {
        // Tampilkan error jika email tidak valid
        error.textContent = "Masukkan email yang valid.";
        error.style.display = 'block';
        return false;
    } else {
        // Sembunyikan error jika email valid
        error.style.display = 'none';
        return true;
    }
}

// Fungsi untuk memvalidasi password
function validatePassword() {
    const password = document.getElementById('password').value; // Mengambil nilai input password
    const error = document.getElementById('passwordError'); // Element untuk menampilkan pesan error

    if (password.length < 8) {
        // Tampilkan error jika password kurang dari 8 karakter
        error.textContent = "Password minimal harus terdapat 8 karakter";
        error.style.display = 'block';
        return false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        // Tampilkan error jika password tidak mengandung huruf dan angka
        error.textContent = "Password harus mencakup angka dan huruf.";
        error.style.display = 'block';
        return false;
    } else {
        // Sembunyikan error jika password valid
        error.style.display = 'none';
        return true;
    }
}

// Fungsi untuk memvalidasi konfirmasi password
function validateConfirmPassword() {
    const password = document.getElementById('password').value; // Mengambil nilai password utama
    const confirmPassword = document.getElementById('confirmPassword').value; // Mengambil nilai konfirmasi password
    const error = document.getElementById('confirmPasswordError'); // Element untuk menampilkan pesan error

    if (confirmPassword !== password) {
        // Tampilkan error jika konfirmasi password tidak cocok
        error.textContent = "Password tidak cocok.";
        error.style.display = 'block';
        return false;
    } else {
        // Sembunyikan error jika password cocok
        error.style.display = 'none';
        return true;
    }
}

// Fungsi untuk memvalidasi seluruh form
function validateForm() {
    // Memanggil semua fungsi validasi dan mengembalikan hasil keseluruhan
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    return isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
}

// Menambah fungsionalitas toggle menu navigasi
let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

// Event klik untuk menampilkan atau menyembunyikan menu
menu.onclick = () => {
    menu.classList.toggle('bx-x'); // Toggle ikon menu
    navList.classList.toggle('open'); // Toggle tampilan daftar navigasi
};

// Konfigurasi animasi ScrollReveal untuk elemen yang muncul saat di-scroll
const sr = ScrollReveal({
    distance: '100px', // Jarak elemen muncul dari posisi awal
    duration: 2000,    // Durasi animasi dalam milidetik
    delay: 300,        // Delay sebelum animasi dimulai
    reset: true        // Mengulang animasi saat elemen di-scroll keluar dan masuk layar
});

// Menambahkan animasi pada elemen tertentu di halaman
sr.reveal('.container', {delay: 200, origin: 'top'}); // Animasi elemen container dari atas
sr.reveal('.hero-img', {delay: 250, origin: 'top'});  // Animasi gambar hero dari atas
sr.reveal('.sosmed', {delay: 400, origin: 'left'});   // Animasi ikon sosmed dari kiri
