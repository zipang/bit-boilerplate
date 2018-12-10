
/**
 * Define every CRUD routes on this domain (/todos)
 * Make the store available
 */
module.exports = async (fastify, conf, next) => {

	// Load the schema of this model
	const { schema, store } = await conf.load('todos');


	fastify.post('/todos', require("./create"));

	fastify.get( '/todos/:id', require("./read"));

	fastify.put( '/todos/:id', require("./update"));

	fastify.delete( '/todos/:id', require("./delete"))

	fastify.get( '/todos', require("./find"));

	next();
}
