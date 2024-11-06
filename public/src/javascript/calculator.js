function hitungNilai() {
    const BOBOT_TUGAS = 0.3;
    const BOBOT_UTS = 0.3;
    const BOBOT_UAS = 0.4;

    const BATAS_A = 90;
    const BATAS_B = 80;
    const BATAS_C = 70;
    const BATAS_D = 60;
    const NILAI_LULUS = 60; // Batas lulus

    let nilaiTugas = parseFloat(document.getElementById("nilaiTugas").value);
    let nilaiUTS = parseFloat(document.getElementById("nilaiUTS").value);
    let nilaiUAS = parseFloat(document.getElementById("nilaiUAS").value);

    if (
        isNaN(nilaiTugas) || nilaiTugas < 0 || nilaiTugas > 100 ||
        isNaN(nilaiUTS) || nilaiUTS < 0 || nilaiUTS > 100 ||
        isNaN(nilaiUAS) || nilaiUAS < 0 || nilaiUAS > 100
    ) {
        document.getElementById("errorMessage").innerText = "Semua nilai harus diisi dan berada dalam rentang 0-100";
        return;
    }

    document.getElementById("errorMessage").innerText = "";

    let kontribusiTugas = BOBOT_TUGAS * nilaiTugas;
    let kontribusiUTS = BOBOT_UTS * nilaiUTS;
    let kontribusiUAS = BOBOT_UAS * nilaiUAS;

    let totalKontribusi = kontribusiTugas + kontribusiUTS + kontribusiUAS;

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

    let statusClass = totalKontribusi >= NILAI_LULUS ? "pass" : "fail";
    let status = totalKontribusi >= NILAI_LULUS ? "Lulus" : "Gagal";
    
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <div><span class="result-title">Kontribusi Nilai Tugas:</span> ${kontribusiTugas.toFixed(2)}</div>
        <div><span class="result-title">Kontribusi Nilai UTS:</span> ${kontribusiUTS.toFixed(2)}</div>
        <div><span class="result-title">Kontribusi Nilai UAS:</span> ${kontribusiUAS.toFixed(2)}</div>
        <div><span class="result-title">Nilai Akhir (Rata-rata Tertimbang):</span> ${totalKontribusi.toFixed(2)}</div>
        <div><span class="result-title">Grade:</span> ${grade}</div>
        <div class="status ${statusClass}"><span class="result-title">Status:</span> ${status}</div>
    `;

    const modal = document.getElementById("resultModal");
    modal.style.display = "block";
}

document.getElementById("closeModal").onclick = function() {
    document.getElementById("resultModal").style.display = "none";
    resetInputs();
};

window.onclick = function(event) {
    const modal = document.getElementById("resultModal");
    if (event.target == modal) {
        modal.style.display = "none";
        resetInputs();
    }
};

function resetInputs() {
    document.getElementById("nilaiTugas").value = "";
    document.getElementById("nilaiUTS").value = "";
    document.getElementById("nilaiUAS").value = "";
    document.getElementById("errorMessage").innerText = "";
    document.getElementById("output").innerHTML = "";
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

sr.reveal('.container', {delay: 200, origin: 'top'});
sr.reveal('.hero-img', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});