/**
 * SEARCH OR LIST EVERY TODOS
 */
module.exports = (req, res) => {
	const store = req.todos;
	const params = req.params;

	res.send(store.find());
}
