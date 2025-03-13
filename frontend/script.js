async function fetchTasks() {
    const response = await fetch('http://192.168.100.102:5000/api/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    await fetch('http://192.168.100.102:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    taskInput.value = '';
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`http://192.168.100.102:5000/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

window.onload = fetchTasks;