'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// let's use a Map as the in memory key-value data store
const todos = new Map();
todos.set('code-review', { id: 'code-review', content: 'review this code' });

app.post('/todos', (req, res) => {

	const newTodo = Object.assign({
		// if the object allready has an id, it will be overwritten
		id: Date.now().toString(32)
	}, req.body);

	todos.set(newTodo.id, newTodo);

	// Tell the client where the new resource is located
	res.setHeader('Location', new URL(`/todos/${newTodo.id}`, 'http://localhost:8080'));
	res.status(201).send(newTodo);
});

app.put('/todos/:id', (req, res) => {
	todos.set(req.params.id, req.body);
	res.sendStatus(200);
});

app.get('/todos/', (req, res) => {
	res.send(Array.from(todos.values()));
});

app.get('/todos/:id', (req, res) => {
	res.send(todos.get(req.params.id));
});

app.get('/', (req, res) => {
	res.send('OK');
});

app.listen(8080, () => {
	console.log('Listening on port 8080...');
});
