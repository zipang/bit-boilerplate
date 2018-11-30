/**
 * Retrive (read) an item (todos) by its unique id
 * > GET /todos/:id
 */
module.exports = (req, resp) => {

	const store = req.todos;
	const id = req.params.id;

	if (!store.has(id)) {
		resp.status(404).send('not found');
	}

	resp.send(store.get(id));
}
