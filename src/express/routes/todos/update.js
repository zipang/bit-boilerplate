/**
 * Update an existing item (todos)
 * >  PUT todos/:id
 * >  { content: "updated content" }
 */
module.exports = (req, resp) => {
	const store = req.todos;

	store.set(req.params.id, req.body);
	resp.sendStatus(200);
}
