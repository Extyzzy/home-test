const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const taskController = require('./controllers/task.controller')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
  taskController.getTasks(req.query).then(data => res.json(data));
});

app.put('/api/task', (req, res) => {
  taskController.updateTask(req.body).then(data => res.json(data));
});

app.delete('/api/task/:id', (req, res) => {
  taskController.deleteTask(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
  res.send(`<h1>Online Filings</h1>`)
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
})