/**
 * DELETE A TODO ITEM
 */
module.exports = (req, res) => {
	const store = req.todos;

	store.delete(req.params.id);

	res.send();
}
