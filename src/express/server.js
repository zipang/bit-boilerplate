'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const todos = [{id: 'jkhsdjkf', content: 'review this code'}];

app.post('/todos', (req, res) => {
	todos.push({
		...req.body,
		id: Math.random().toString(32).slice(2)
	});
	res.sendStatus(201);
});

app.put('/todos/:id', (req, res) => {
	todos[Number(req.params.id)] = req.body;
	res.sendStatus(200);
});

app.get('/todos/:id', (req, res) => {
	res.send(todos[id]);
});

app.get('/todos/all', (req, res) => {
	res.send(todos);
});

app.get('/', (req, res) => {
	res.send('OK');
});

app.listen(8080, () => {
	console.log('Listening on port 8080...');
});
