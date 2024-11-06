class ShoppingCart {
    constructor() {
        this.cart = [];
    }

    addItem(name, price, quantity) {
        const item = { name, price, quantity };
        this.cart.push(item);
        this.displayCart();
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.displayCart();
    }

    calculateSubtotal() {
        return this.cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
    }

    calculateDiscount() {
        const subtotal = this.calculateSubtotal();
        let discountPercentage = 0;

        if (subtotal > 2000000) {
            discountPercentage = 15;
        } else if (subtotal > 1000000) {
            discountPercentage = 10;
        }

        const totalQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
        if (totalQuantity > 5) {
            discountPercentage += 5;
        }

        return subtotal * (discountPercentage / 100);
    }

    calculateTotal() {
        const subtotal = this.calculateSubtotal();
        const discount = this.calculateDiscount();
        return subtotal - discount;
    }

    displayCart() {
        const cartItems = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotal');
        const discountElement = document.getElementById('discount');
        const totalElement = document.getElementById('total');

        cartItems.innerHTML = '';
        this.cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - Rp ${item.price} x ${item.quantity}
                <button onclick="removeItem(${index})">Hapus</button>
            `;
            cartItems.appendChild(li);
        });

        subtotalElement.textContent = `Subtotal: Rp ${this.calculateSubtotal().toFixed(2)}`;
        discountElement.textContent = `Diskon: Rp ${this.calculateDiscount().toFixed(2)}`;
        totalElement.textContent = `Total setelah diskon: Rp ${this.calculateTotal().toFixed(2)}`;
    }
}

const cart = new ShoppingCart();

function addItem() {
    const name = document.getElementById('itemName').value;
    const price = parseInt(document.getElementById('itemPrice').value);
    const quantity = parseInt(document.getElementById('itemQuantity').value);

    if (name && price > 0 && quantity > 0) {    
        cart.addItem(name, price, quantity);
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemQuantity').value = '';
    } else {
        alert('Masukkan nama barang, harga yang valid, dan kuantitas!');
    }
}

function removeItem(index) {
    cart.removeItem(index);
}

let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('open');
}

const sr = ScrollReveal ({
    distance: '100px',
    duration: 2000,
    delay: 300,
    reset: true
});

sr.reveal('.hero-main', {delay: 250, origin: 'top'});
sr.reveal('.hero-cart', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});