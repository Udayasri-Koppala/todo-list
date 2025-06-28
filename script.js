document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyMessage = document.getElementById('empty-message');
    const todoForm = document.getElementById('todo-form');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;
            li.querySelector('.delete-btn').addEventListener('click', () => {
                removeTask(task.text);
            });
            li.addEventListener('click', () => {
                toggleTaskCompletion(task.text);
            });
            taskList.appendChild(li);
        });
        emptyMessage.style.display = tasks.length === 0 ? 'block' : 'none';
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (text) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        loadTasks();
    };

    const removeTask = (text) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== text);
        saveTasks(tasks);
        loadTasks();
    };

    const toggleTaskCompletion = (text) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.text === text);
        if (task) {
            task.completed = !task.completed;
            saveTasks(tasks);
            loadTasks();
        }
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    loadTasks();
});
