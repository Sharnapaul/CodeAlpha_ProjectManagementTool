async function loadTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    
    document.getElementById('todo-list').innerHTML = "";
    document.getElementById('doing-list').innerHTML = "";
    document.getElementById('done-list').innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-card';
        div.innerText = task.title;
        div.draggable = true;
        div.id = task.id;
        div.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
        
        document.getElementById(`${task.status}-list`).appendChild(div);
    });
}

function allowDrop(e) { e.preventDefault(); }

async function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const newStatus = e.currentTarget.id;

    await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ status: newStatus })
    });
    loadTasks();
}

async function addTask() {
    const title = document.getElementById('taskInput').value;
    if(!title) return;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title })
    });
    document.getElementById('taskInput').value = "";
    loadTasks();
}

loadTasks();