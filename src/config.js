const stores = require('./datastores');

module.exports = {
	port: 3000,

	// Load information on a specific model
	load: async (modelName) => {
		const { validate, schema } = require(`./Models/${modelName}`);
		const store = stores.get(modelName);
		return {
			validate,
			schema,
			store
		}
	}
}
