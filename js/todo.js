document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.column');
    let draggedItem = null;

    document.querySelectorAll('.task').forEach(task => {
        task.addEventListener('dragstart', () => {
            draggedItem = task;
            setTimeout(() => {
                task.style.display = 'none';
            }, 0);
        });

        task.addEventListener('dragend', () => {
            setTimeout(() => {
                task.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
        });

        column.addEventListener('dragenter', e => {
            e.preventDefault();
            column.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        column.addEventListener('dragleave', () => {
            column.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        });

        column.addEventListener('drop', () => {
            column.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            column.appendChild(draggedItem);
        });
    });
    
});

document.getElementById('add-task-button').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.draggable = true;
        newTask.innerText = taskText;
        document.getElementById('todo').appendChild(newTask);
        taskInput.value = '';
    }
});

const drake = dragula([document.getElementById('todo'), document.getElementById('in-progress'), document.getElementById('done')]);

const socket = io('http://localhost:3000');
drake.on('drop', function (el, target, source, sibling) {
    const taskId = el.innerText;
    const targetId = target.id;
    socket.emit('task', { taskId, targetId });
});