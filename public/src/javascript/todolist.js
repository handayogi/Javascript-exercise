const taskTitleInput = document.getElementById('taskTitle');
const dueDateInput = document.getElementById('dueDate');
const taskPriorityInput = document.getElementById('taskPriority');
const taskCategoryInput = document.getElementById('taskCategory');
const taskList = document.getElementById('taskList');
const taskStats = document.getElementById('taskStats');

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const title = taskTitleInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = taskPriorityInput.value;
    const category = taskCategoryInput.value.trim();

    if (title === '') {
        alert('Masukkan judul tugas.');
        return;
    }

    const task = {
        id: Date.now(),
        title,
        dueDate,
        priority,
        category,
        completed: false
    };

    saveTask(task);
    displayTask(task);
    taskTitleInput.value = '';
    dueDateInput.value = '';
    taskPriorityInput.value = 'normal';
    taskCategoryInput.value = '';
    updateTaskStats();
}

function displayTask(task) {
    if (!shouldDisplayTask(task)) return;

    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', task.id);
    listItem.classList.toggle('completed', task.completed);

    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    titleSpan.classList.add('task-title');
    titleSpan.addEventListener('click', function () {
        toggleTaskCompletion(task.id);
    });

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = task.dueDate ? `Jatuh tempo: ${task.dueDate}` : '';
    dueDateSpan.classList.add('due-date');

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = `Prioritas: ${task.priority}`;
    prioritySpan.classList.add('due-date');

    const categorySpan = document.createElement('span');
    categorySpan.textContent = `Kategori: ${task.category}`;
    categorySpan.classList.add('due-date');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', function () {
        editTask(task.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function () {
        deleteTask(task.id);
    });

    listItem.appendChild(titleSpan);
    listItem.appendChild(dueDateSpan);
    listItem.appendChild(prioritySpan);
    listItem.appendChild(categorySpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}

function shouldDisplayTask(task) {
    if (currentFilter === 'completed' && !task.completed) return false;
    if (currentFilter === 'active' && task.completed) return false;
    return true;
}

function toggleTaskCompletion(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        refreshTaskList();
    }
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    refreshTaskList();
    updateTaskStats();
}

function editTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        taskTitleInput.value = task.title;
        dueDateInput.value = task.dueDate;
        taskPriorityInput.value = task.priority;
        taskCategoryInput.value = task.category;
        deleteTask(taskId);
    }
}

function loadTasks() {
    const tasks = getTasks().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    tasks.forEach(task => displayTask(task));
    updateTaskStats();
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function filterTasks(filter) {
    currentFilter = filter;
    refreshTaskList();
}

function refreshTaskList() {
    taskList.innerHTML = '';
    loadTasks();
}

function updateTaskStats() {
    const tasks = getTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = totalTasks - completedTasks;
    
    taskStats.textContent = `Total Tugas: ${totalTasks}, Selesai: ${completedTasks}, Aktif: ${activeTasks}`;
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
sr.reveal('.hero-text', {delay: 250, origin: 'top'});
sr.reveal('.sosmed', {delay: 400, origin: 'left'});