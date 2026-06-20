const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: "Design Database", status: "todo" },
    { id: 2, title: "Setup Server", status: "doing" }
];


app.get('/api/tasks', (req, res) => res.json(tasks));


app.post('/api/tasks', (req, res) => {
    const newTask = { id: Date.now(), title: req.body.title, status: "todo" };
    tasks.push(newTask);
    res.json(newTask);
});


app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.status = req.body.status;
        res.json(task);
    }
});

app.listen(PORT, () => console.log(`Manager running: http://localhost:${PORT}`));