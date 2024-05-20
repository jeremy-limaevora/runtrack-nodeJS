const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dataFilePath = path.join(__dirname, 'data.json');

const getData = () => {
  const jsonData = fs.readFileSync(dataFilePath);
  return JSON.parse(jsonData);
};

const saveData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath, stringifyData);
};

router.get('/tasks', (req, res) => {
  const data = getData();
  res.json(data.tasks);
});

router.get('/tasks/:id', (req, res) => {
  const data = getData();
  const task = data.tasks.find(task => task.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

router.post('/tasks', (req, res) => {
  const data = getData();
  const newTask = {
    id: data.tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };
  data.tasks.push(newTask);
  saveData(data);
  res.status(201).json(newTask);
});

router.put('/tasks/:id', (req, res) => {
  const data = getData();
  const taskIndex = data.tasks.findIndex(task => task.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    data.tasks[taskIndex] = {
      id: parseInt(req.params.id),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    };
    saveData(data);
    res.json(data.tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

router.delete('/tasks/:id', (req, res) => {
  const data = getData();
  const taskIndex = data.tasks.findIndex(task => task.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    data.tasks.splice(taskIndex, 1);
    saveData(data);
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
