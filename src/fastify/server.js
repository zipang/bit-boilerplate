
const conf = require('../config');

// Instantiate Fastify with some basic conf
const app = require('fastify')(Object.assign({
	ignoreTrailingSlash: true,
	logger: true,
	pluginTimeout: 10000
}, conf.fastify));

// Helper to dump every loaded routes
app.register(require('fastify-routes'));

// Register any routes
app.register(require('./routes/'), conf);

// Run the server!
const start = async () => {
	try {
		await app.listen(3000);
		app.log.info(`Server listening on ${app.server.address().port}`);
		console.dir(app.routes);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}
start();

