const stores = require('../../../datastores');
const validate = require('../../../Models/todos/validate');

/**
 * Define every CRUD routes on this domain (/todos)
 * Make the store available
 */
module.exports = (router) => {

	router.all('/todos/*', async (req, resp, next) => {
		// make the store available to each request in the domain
		req.todos = await stores.get('todos', { validate });
		next();
	});

	router.post('/todos',     require("./create"));
	router.get( '/todos/:id', require("./read"));
	router.put( '/todos/:id', require("./update"));
	router.delete( '/todos/:id', require("./delete"))

	router.get( '/todos',     require("./find"));

}
