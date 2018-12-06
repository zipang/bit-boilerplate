const DEFAULT_STORE = {
	db: 'in-memory',
};
const stores = {};

/**
 * Retrieves (and create if needed) a datastore for the given domain
 * @param {String} name of the domain (usually the model name)
 * @param {Object} conf a configuration object specific to every store implementation
 */
const get = async (name, conf) => {

	let store = stores[name]; // access loaded stores

	if (!store) {
		// We'll have to create one
		const storeConf = Object.assign({}, DEFAULT_STORE, conf);
		// Load the store factory
		let storeFactory;
		try {
			storeFactory = require(`./${storeConf.db}`);
		} catch (err) {
			throw new Error(`${storeConf.db} data store is unknown`);
		}
		stores[name] = store = await storeFactory.create(conf);
	}

	return store;
}

module.exports = { get };
