// Mendefinisikan fungsi untuk menghitung nilai akhir berdasarkan input tugas, UTS, dan UAS
function hitungNilai() {
    // Bobot nilai untuk setiap kriteria
    const BOBOT_TUGAS = 0.3;
    const BOBOT_UTS = 0.3;
    const BOBOT_UAS = 0.4;

    // Batas lulus/nilai untuk setiap grade
    const BATAS_A = 90;
    const BATAS_B = 80;
    const BATAS_C = 70;
    const BATAS_D = 60;
    const NILAI_LULUS = 60; // Batas lulus

    // Mendapatkan nilai dari input tugas, UTS, dan UAS
    let nilaiTugas = parseFloat(document.getElementById("nilaiTugas").value);
    let nilaiUTS = parseFloat(document.getElementById("nilaiUTS").value);
    let nilaiUAS = parseFloat(document.getElementById("nilaiUAS").value);

    // Validasi input: semua nilai harus diisi dan berada dalam rentang 0-100
    if (
        isNaN(nilaiTugas) || nilaiTugas < 0 || nilaiTugas > 100 ||
        isNaN(nilaiUTS) || nilaiUTS < 0 || nilaiUTS > 100 ||
        isNaN(nilaiUAS) || nilaiUAS < 0 || nilaiUAS > 100
    ) {
        // Tampilkan pesan kesalahan jika input tidak valid
        document.getElementById("errorMessage").innerText = "Semua nilai harus diisi dan berada dalam rentang 0-100";
        return;
    }

    // Reset pesan kesalahan jika input valid/benar
    document.getElementById("errorMessage").innerText = "";

    // Menghitung kontribusi untuk setiap kriteria
    let kontribusiTugas = BOBOT_TUGAS * nilaiTugas;
    let kontribusiUTS = BOBOT_UTS * nilaiUTS;
    let kontribusiUAS = BOBOT_UAS * nilaiUAS;

    // Menghitung total kontribusi
    let totalKontribusi = kontribusiTugas + kontribusiUTS + kontribusiUAS;

    // Menghitung grade berdasarkan total kontribusi
    let grade;
    if (totalKontribusi >= BATAS_A) {
        grade = "A";
    } else if (totalKontribusi >= BATAS_B) { 
        grade = "B";
    } else if (totalKontribusi >= BATAS_C) {
        grade = "C";
    } else if (totalKontribusi >= BATAS_D) {
        grade = "D";
    } else {
        grade = "E";
    }

    // Menentukan status lulus atau gagal berdasarkan total kontribusi
    let statusClass = totalKontribusi >= NILAI_LULUS ? "pass" : "fail";
    let status = totalKontribusi >= NILAI_LULUS ? "Lulus" : "Gagal";
    
    // Menampilkan hasil kalkulasi dalam bentuk modal
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <div><span class="result-title">Kontribusi Nilai Tugas:</span> ${kontribusiTugas.toFixed(2)}</div>
        <div><span class="result-title">Kontribusi Nilai UTS:</span> ${kontribusiUTS.toFixed(2)}</div>
        <div><span class="result-title">Kontribusi Nilai UAS:</span> ${kontribusiUAS.toFixed(2)}</div>
        <div><span class="result-title">Nilai Akhir (Rata-rata Tertimbang):</span> ${totalKontribusi.toFixed(2)}</div>
        <div><span class="result-title">Grade:</span> ${grade}</div>
        <div class="status ${statusClass}"><span class="result-title">Status:</span> ${status}</div>
    `;

    // Menampilkan modal
    const modal = document.getElementById("resultModal");
    modal.style.display = "block";
}

// Fungsi untuk menutup modal saat "X" diklik
document.getElementById("closeModal").onclick = function() {
    document.getElementById("resultModal").style.display = "none";
    resetInputs(); // Mengembalikan input-nilai ke awal
};

// Fungsi untuk menutup modal saat pengguna mengklik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById("resultModal");
    if (event.target == modal) {
        modal.style.display = "none";
        resetInputs();
    }
};

// Fungsi untuk mengembalikan reset input dan pesan error ke awal
function resetInputs() {
    document.getElementById("nilaiTugas").value = "";
    document.getElementById("nilaiUTS").value = "";
    document.getElementById("nilaiUAS").value = "";
    document.getElementById("errorMessage").innerText = "";
    document.getElementById("output").innerHTML = "";
}

// Fungsi untuk navigasi interaktif, membuka atau menutup daftar navigasi saat icon diklik
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

sr.reveal('.container', {delay: 200, origin: 'top'});
sr.reveal('.hero-img', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});