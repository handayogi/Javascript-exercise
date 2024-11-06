document.getElementById('username').addEventListener('keyup', validateUsername);
document.getElementById('email').addEventListener('change', validateEmail);
document.getElementById('password').addEventListener('keyup', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);

function validateUsername() {
    const username = document.getElementById('username').value;
    const error = document.getElementById('usernameError');
    const usernamePattern = /^[a-zA-Z0-9]{5,20}$/;

    if (!usernamePattern.test(username)) {
        error.textContent = "Username harus 5-20 karakter alfanumerik.";
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const error = document.getElementById('emailError');
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!emailPattern.test(email)) {
        error.textContent = "Masukkan email yang valid.";
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const error = document.getElementById('passwordError');

    if (password.length < 8) {
        error.textContent = "Password minimal harus terdapat 8 karakter";
        error.style.display = 'block';
        return false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        error.textContent = "Password harus mencakup angka dan huruf.";
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const error = document.getElementById('confirmPasswordError');

    if (confirmPassword !== password) {
        error.textContent = "Password tidak cocok.";
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validateForm() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    return isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
}

let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('open');
};

const sr = ScrollReveal ({
    distance: '100px',
    duration: 2000,
    delay: 300,
    reset: true
});

sr.reveal('.container', {delay: 200, origin: 'top'});
sr.reveal('.hero-img', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});