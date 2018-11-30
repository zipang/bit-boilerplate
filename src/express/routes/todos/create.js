/**
 * CREATE A NEW TODO
 */
module.exports = (req, resp) => {

	const store = req.todos;

	const newTodo = Object.assign({
		// if the object allready has an id, it will overwritte this one
		id: Date.now().toString(32)
	}, req.body);

	// Store the new todo in the key-value store
	store.set(newTodo.id, newTodo);

	// Tell the client where the new respource is located
	resp.setHeader('Location', new URL(`/todos/${newTodo.id}`, 'http://localhost:8080'));

	// Send HTTP Status 201 : CREATED
	resp.status(201).send(newTodo);
}

