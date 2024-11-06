// Kelas untuk mengelola keranjang belanja
class ShoppingCart {
    constructor() {
        // Inisialisasi keranjang belanja sebagai array kosong
        this.cart = [];
    }

    // Metode untuk menambahkan item ke dalam keranjang
    addItem(name, price, quantity) {
        // Membuat objek item dengan nama, harga, dan kuantitas
        const item = { name, price, quantity };
        // Menambahkan item ke array cart
        this.cart.push(item);
        // Memperbarui tampilan keranjang
        this.displayCart();
    }

    // Metode untuk menghapus item dari keranjang berdasarkan indeks
    removeItem(index) {
        // Menghapus item pada indeks yang ditentukan
        this.cart.splice(index, 1);
        // Memperbarui tampilan keranjang
        this.displayCart();
    }

    // Metode untuk menghitung subtotal dari semua item di keranjang
    calculateSubtotal() {
        // Menggunakan reduce untuk menjumlahkan harga * kuantitas setiap item
        return this.cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
    }

    // Metode untuk menghitung diskon berdasarkan subtotal dan total kuantitas item
    calculateDiscount() {
        const subtotal = this.calculateSubtotal();
        let discountPercentage = 0;

        // Menghitung diskon berdasarkan subtotal
        if (subtotal > 2000000) {
            discountPercentage = 15;
        } else if (subtotal > 1000000) {
            discountPercentage = 10;
        }

        // Menghitung total kuantitas semua item dalam keranjang
        const totalQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        // Tambahan diskon 5% jika total kuantitas lebih dari 5 item
        if (totalQuantity > 5) {
            discountPercentage += 5;
        }

        // Mengembalikan nilai diskon dalam rupiah
        return subtotal * (discountPercentage / 100);
    }

    // Metode untuk menghitung total setelah diskon
    calculateTotal() {
        const subtotal = this.calculateSubtotal();
        const discount = this.calculateDiscount();
        // Total setelah diskon adalah subtotal dikurangi diskon
        return subtotal - discount;
    }

    // Metode untuk menampilkan isi keranjang di halaman web
    displayCart() {
        const cartItems = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotal');
        const discountElement = document.getElementById('discount');
        const totalElement = document.getElementById('total');

        // Mengosongkan daftar item sebelum menambahkan item terbaru
        cartItems.innerHTML = '';
        this.cart.forEach((item, index) => {
            // Membuat elemen <li> untuk setiap item di keranjang
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - Rp ${item.price} x ${item.quantity}
                <button onclick="removeItem(${index})">Hapus</button>
            `;
            // Menambahkan item ke dalam daftar tampilan
            cartItems.appendChild(li);
        });

        // Memperbarui tampilan subtotal, diskon, dan total setelah diskon
        subtotalElement.textContent = `Subtotal: Rp ${this.calculateSubtotal().toFixed(2)}`;
        discountElement.textContent = `Diskon: Rp ${this.calculateDiscount().toFixed(2)}`;
        totalElement.textContent = `Total setelah diskon: Rp ${this.calculateTotal().toFixed(2)}`;
    }
}

// Inisialisasi objek keranjang belanja
const cart = new ShoppingCart();

// Fungsi untuk menambahkan item ke dalam keranjang
function addItem() {
    const name = document.getElementById('itemName').value;
    const price = parseInt(document.getElementById('itemPrice').value);
    const quantity = parseInt(document.getElementById('itemQuantity').value);

    // Validasi input: nama, harga harus lebih dari 0, dan kuantitas harus lebih dari 0
    if (name && price > 0 && quantity > 0) {    
        cart.addItem(name, price, quantity);
        // Mengosongkan input setelah item ditambahkan
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemQuantity').value = '';
    } else {
        alert('Masukkan nama barang, harga yang valid, dan kuantitas!');
    }
}

// Fungsi untuk menghapus item dari keranjang berdasarkan indeks
function removeItem(index) {
    cart.removeItem(index);
}

// Menambahkan fungsionalitas untuk menu interaktif
let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

// Menampilkan atau menyembunyikan menu navigasi saat ikon diklik
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('open');
}

// Konfigurasi animasi ScrollReveal untuk elemen yang muncul saat di-scroll
const sr = ScrollReveal ({
    distance: '100px', // Jarak elemen muncul dari posisi awal
    duration: 2000,    // Durasi animasi dalam milidetik
    delay: 300,        // Delay sebelum animasi dimulai
    reset: true        // Mengulang animasi saat elemen di-scroll keluar dan masuk layar
});

// Menambahkan animasi pada elemen-elemen tertentu di halaman
sr.reveal('.hero-main', {delay: 250, origin: 'top'}); // Animasi elemen utama dari atas
sr.reveal('.hero-cart', {delay: 250, origin: 'top'}); // Animasi keranjang dari atas
sr.reveal('.sosmed', {delay: 400, origin: 'left'});   // Animasi ikon sosmed dari kiri
