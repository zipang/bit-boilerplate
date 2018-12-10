/**
 * Add the sub-routes
 */
module.exports = (fastify, conf, next) => {
	fastify.register(require('./todos'), conf);
	next();
}
