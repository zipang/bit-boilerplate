
// let's use a Map as the in memory key-value data store
const todos = new Map();
todos.set('code-review', { id: 'code-review', content: 'review this code' });

/**
 * Define every CRUD routes on this domain (/todos)
 * Make the store available
 */
module.exports = (router) => {

	router.all('/todos/*', (req, resp, next) => {
		req.todos = todos; // make the todo store available
		next();
	});

	router.post('/todos',     require("./create"));
	router.get( '/todos/:id', require("./read"));
	router.put( '/todos/:id', require("./update"));

	router.get( '/todos',     require("./find"));

}
