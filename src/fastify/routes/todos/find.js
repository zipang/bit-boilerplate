/**
 * SEARCH OR LIST EVERY TODOS
 */
module.exports = async (req, res) => {
	const store = req.todos;
	const params = req.params;

	res.send(await store.find());
}
