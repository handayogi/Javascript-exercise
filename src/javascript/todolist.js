// Mengambil elemen input dan elemen lainnya yang diperlukan
const taskTitleInput = document.getElementById('taskTitle');
const dueDateInput = document.getElementById('dueDate');
const taskPriorityInput = document.getElementById('taskPriority');
const taskCategoryInput = document.getElementById('taskCategory');
const taskList = document.getElementById('taskList');
const taskStats = document.getElementById('taskStats');

// Variabel untuk menyimpan filter tugas (semua, aktif, atau selesai)
let currentFilter = 'all';

// Memuat tugas yang tersimpan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', loadTasks);

// Fungsi untuk menambah tugas baru
function addTask() {
    const title = taskTitleInput.value.trim(); // Mengambil judul tugas
    const dueDate = dueDateInput.value; // Mengambil tanggal jatuh tempo
    const priority = taskPriorityInput.value; // Mengambil prioritas tugas
    const category = taskCategoryInput.value.trim(); // Mengambil kategori tugas

    // Validasi untuk memastikan judul tugas tidak kosong
    if (title === '') {
        alert('Masukkan judul tugas.');
        return;
    }

    // Membuat objek task baru
    const task = {
        id: Date.now(), // ID unik berdasarkan waktu
        title,
        dueDate,
        priority,
        category,
        completed: false // Status tugas, awalnya belum selesai
    };

    // Menyimpan tugas baru dan menampilkan tugas di daftar
    saveTask(task);
    displayTask(task);

    // Reset input setelah tugas ditambahkan
    taskTitleInput.value = '';
    dueDateInput.value = '';
    taskPriorityInput.value = 'normal'; // Set prioritas default
    taskCategoryInput.value = '';

    // Memperbarui statistik tugas setelah penambahan
    updateTaskStats();
}

// Fungsi untuk menampilkan tugas di dalam daftar
function displayTask(task) {
    if (!shouldDisplayTask(task)) return; // Memeriksa apakah tugas sesuai dengan filter

    // Membuat elemen list item untuk tugas
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', task.id); // Menyimpan ID di atribut data
    listItem.classList.toggle('completed', task.completed); // Menambahkan kelas 'completed' jika tugas sudah selesai

    // Menambahkan elemen-elemen yang terkait dengan tugas
    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    titleSpan.classList.add('task-title');
    titleSpan.addEventListener('click', function () {
        toggleTaskCompletion(task.id); // Toggle status selesai/tidak selesai saat judul diklik
    });

    // Menampilkan tanggal jatuh tempo, jika ada
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = task.dueDate ? `Jatuh tempo: ${task.dueDate}` : '';
    dueDateSpan.classList.add('due-date');

    // Menampilkan prioritas tugas
    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = `Prioritas: ${task.priority}`;
    prioritySpan.classList.add('due-date');

    // Menampilkan kategori tugas
    const categorySpan = document.createElement('span');
    categorySpan.textContent = `Kategori: ${task.category}`;
    categorySpan.classList.add('due-date');

    // Tombol untuk mengedit tugas
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', function () {
        editTask(task.id); // Menjalankan fungsi edit saat tombol diklik
    });

    // Tombol untuk menghapus tugas
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function () {
        deleteTask(task.id); // Menjalankan fungsi delete saat tombol diklik
    });

    // Menambahkan semua elemen ke dalam list item dan kemudian ke dalam task list
    listItem.appendChild(titleSpan);
    listItem.appendChild(dueDateSpan);
    listItem.appendChild(prioritySpan);
    listItem.appendChild(categorySpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Menambahkan list item ke dalam task list
    taskList.appendChild(listItem);
}

// Fungsi untuk memeriksa apakah tugas harus ditampilkan berdasarkan filter
function shouldDisplayTask(task) {
    if (currentFilter === 'completed' && !task.completed) return false; // Menyembunyikan tugas yang belum selesai
    if (currentFilter === 'active' && task.completed) return false; // Menyembunyikan tugas yang sudah selesai
    return true;
}

// Fungsi untuk mengubah status selesai/tidak selesai tugas
function toggleTaskCompletion(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId); // Mencari tugas berdasarkan ID
    if (task) {
        task.completed = !task.completed; // Toggle status selesai
        saveTasks(tasks);
        refreshTaskList(); // Menyegarkan daftar tugas
    }
}

// Fungsi untuk menghapus tugas
function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId); // Menghapus tugas berdasarkan ID
    saveTasks(tasks);
    refreshTaskList(); // Menyegarkan daftar tugas
    updateTaskStats(); // Memperbarui statistik tugas
}

// Fungsi untuk mengedit tugas
function editTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId); // Mencari tugas berdasarkan ID
    if (task) {
        // Mengisi input dengan nilai tugas yang akan diedit
        taskTitleInput.value = task.title;
        dueDateInput.value = task.dueDate;
        taskPriorityInput.value = task.priority;
        taskCategoryInput.value = task.category;
        deleteTask(taskId); // Menghapus tugas yang sedang diedit
    }
}

// Fungsi untuk memuat tugas yang tersimpan dari localStorage
function loadTasks() {
    const tasks = getTasks().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Mengurutkan tugas berdasarkan tanggal jatuh tempo
    tasks.forEach(task => displayTask(task)); // Menampilkan setiap tugas
    updateTaskStats(); // Memperbarui statistik tugas
}

// Fungsi untuk menyimpan tugas baru ke dalam localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks); // Menyimpan tugas yang sudah ditambahkan
}

// Fungsi untuk menyimpan array tugas ke dalam localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk mengambil tugas yang tersimpan dari localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []; // Mengambil tugas, jika tidak ada, return array kosong
}

// Fungsi untuk memfilter tugas berdasarkan status
function filterTasks(filter) {
    currentFilter = filter;
    refreshTaskList(); // Menyegarkan daftar tugas berdasarkan filter
}

// Fungsi untuk menyegarkan (reload) daftar tugas
function refreshTaskList() {
    taskList.innerHTML = ''; // Menghapus semua elemen dalam daftar tugas
    loadTasks(); // Memuat ulang tugas
}

// Fungsi untuk memperbarui statistik tugas
function updateTaskStats() {
    const tasks = getTasks();
    const totalTasks = tasks.length; // Menghitung total tugas
    const completedTasks = tasks.filter(task => task.completed).length; // Menghitung tugas yang selesai
    const activeTasks = totalTasks - completedTasks; // Menghitung tugas yang aktif (belum selesai)
    
    // Menampilkan statistik di elemen taskStats
    taskStats.textContent = `Total Tugas: ${totalTasks}, Selesai: ${completedTasks}, Aktif: ${activeTasks}`;
}

// Fungsionalitas toggle menu navigasi
let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

// Event klik untuk menampilkan atau menyembunyikan menu
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('open');
};

// Konfigurasi animasi ScrollReveal untuk elemen yang muncul saat di-scroll
const sr = ScrollReveal ({
    distance: '100px',
    duration: 2000,
    delay: 300,
    reset: true
});

// Menambahkan animasi pada elemen tertentu di halaman
sr.reveal('.container', {delay: 200, origin: 'top'}); // Animasi elemen container dari atas
sr.reveal('.hero-img', {delay: 250, origin: 'top'});  // Animasi gambar hero dari atas
sr.reveal('.sosmed', {delay: 400, origin: 'left'});   // Animasi ikon sosmed dari kiri
