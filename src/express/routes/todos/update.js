/**
 * Update an existing item (todos)
 * >  PUT todos/:id
 * >  { content: "updated content" }
 */
module.exports = (req, resp) => {
	const store = req.todos;
	const id = req.params.id;

	if (!store.has(id)) {
		resp.status(404).send('not found');
	}

	let updated = Object.assign(store.get(id), req.body);

	try {
		store.set(id, updated);
		resp.sendStatus(200);

	} catch (err) {
		// Bad request : a validation error has occured
		resp.status(400).send(JSON.stringify(err));
	}
}
