/**
 * DELETE A TODO ITEM
 */
module.exports = async (req, res) => {
	const store = req.todos;

	await store.delete(req.params.id);

	res.send();
}
