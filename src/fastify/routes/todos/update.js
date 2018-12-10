/**
 * Update an existing item (todos)
 * >  PUT todos/:id
 * >  { content: "updated content" }
 */
module.exports = async (req, resp) => {
	const store = req.todos;
	const id = req.params.id;
	const found = await store.has(id);

	if (!found) {
		resp.status(404).send('not found');
	}

	let updated = Object.assign(await store.get(id), req.body);

	try {
		await store.set(id, updated);
		resp.status(200);

	} catch (err) {
		// Bad request : a validation error has occured
		resp.status(400).send(JSON.stringify(err));
	}
}
