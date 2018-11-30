/**
 * SEARCH OR LIST EVERY TODOS
 */
module.exports = (req, res) => {
	const store = req.todos;

	res.send(Array.from(store.values()));
}
