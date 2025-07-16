class DailyPlanner {
    constructor() {
        this.tasks = this.loadTasks();
        this.init();
    }

    init() {
        this.displayCurrentDate();
        this.bindEvents();
        this.renderTasks();
    }

    displayCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('current-date').textContent = 
            now.toLocaleDateString('en-US', options);
    }

    bindEvents() {
        const form = document.getElementById('task-form');
        form.addEventListener('submit', (e) => this.handleAddTask(e));
        
        // Event delegation for task buttons
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.addEventListener('click', (e) => this.handleTaskAction(e));
    }

    handleAddTask(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value.trim();
        const time = document.getElementById('task-time').value;
        const notes = document.getElementById('task-notes').value.trim();

        if (!title || !time) {
            alert('Please fill in both title and time fields.');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            time,
            notes,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.clearForm();
    }

    clearForm() {
        document.getElementById('task-form').reset();
    }

    renderTasks() {
        const container = document.getElementById('tasks-container');

        if (this.tasks.length === 0) {
            container.innerHTML = '<p id="no-tasks-message">No tasks for today. Add one above!</p>';
            return;
        }
        
        // Sort tasks by time
        const sortedTasks = [...this.tasks].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        container.innerHTML = sortedTasks.map(task => this.createTaskHTML(task)).join('');
    }

    createTaskHTML(task) {
        const timeFormatted = this.formatTime(task.time);
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
                    <span class="task-time">${timeFormatted}</span>
                </div>
                ${task.notes ? `<div class="task-notes">${task.notes}</div>` : ''}
                <div class="task-actions">
                    <button class="btn-complete" data-action="complete" data-task-id="${task.id}">
                        ${task.completed ? '↩️ Undo' : '✅ Complete'}
                    </button>
                    <button class="btn-delete" data-action="delete" data-task-id="${task.id}">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }

    formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const hour12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hour12}:${minutes} ${ampm}`;
    }

    handleTaskAction(e) {
        if (!e.target.matches('button[data-action]')) return;
        
        const action = e.target.dataset.action;
        const taskId = parseInt(e.target.dataset.taskId);
        
        if (action === 'complete') {
            this.toggleComplete(taskId);
        } else if (action === 'delete') {
            this.deleteTask(taskId);
        }
    }

    bindTaskEvents() {
        // Task events are now handled via event delegation in bindEvents()
    }

    toggleComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
        }
    }

    loadTasks() {
        const today = new Date().toDateString();
        const savedTasks = localStorage.getItem(`tasks_${today}`);
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

    saveTasks() {
        const today = new Date().toDateString();
        localStorage.setItem(`tasks_${today}`, JSON.stringify(this.tasks));
    }
}

// Initialize the planner when the page loads
let planner;
document.addEventListener('DOMContentLoaded', () => {
    planner = new DailyPlanner();
});