/**
 * DELETE A TODO ITEM
 */
module.exports = (req, res) => {
	const store = req.dodos;

	store.remove(req.params.id);

	res.send();
}
