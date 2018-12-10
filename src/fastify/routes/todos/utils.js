/**
 * Extract :params from the request url
 * Usage example :
 *   extractParams('/path/to/:city@:lat-:lng') => ['city', 'lat', 'lng']
 * @param  {String} path
 * @return {Array} containing the name of all the extracted params
 */
const extractParams = (path) => {
	const params = [];
	const regex = /:([a-zA-Z]+)/g;
	let paramFound = false;

	while (paramFound = regex.exec(path)) {
		params.push(paramFound[1]);
	}
	return params;
}

/**
 * Creating JSON schemas to validate and serialize data for every routes
 * is particularly cumbersome
 * @see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * We need a utility function
 *
 * @param  {String} verb GET, POST, PUT, DELETE
 * @param  {String} url  allows to extract params
 * @param  {Object} schema The schema for a single item (aka Model validation)
 */
const createRoute = ( verb, url, objectSchema ) => {

	const schema = {};

	verb = verb.toUpperCase().trim(); // allow caseless comparaison

	// CREATE
	if (verb === 'POST') {
		schema.body = objectSchema;
	}

	// find the params in the url
	const params = extractParams(url);
	if (params.length) {
		schema.params = {
			type: 'object',
			properties: {}
		};
		params.forEach( paramName => {
			schema.params.properties[paramName] = schema.properties[paramName];
		});
	}

	// UPDATE
	if (verb === 'PUT') {
		schema.body = Object.assign({}, objectSchema);
		// Allow partial updates : only the submitted fields are applied
		delete schema.body.required;
	}

	// DELETE
	if (verb === 'DELETE') {
		// Usually a successfull DELETE returns nothing but a 200 or a 204 status code
		// but you may want it to return the deleted object
		// schema.response = {
		// 	204: Object.assign({}, objectSchema)
		// }
	}

	// GET, FIND
	if (verb === 'GET') {
		if (params.length) {
			// Add the response schema returning a single object
			schema.response = {
				200: Object.assign({}, objectSchema)
			}
		} else { // FIND ALL OR SEARCH PARAMS are passed through the querystring
			// Add the response schema returning an array of objects
			schema.response = {
				200: {
					type: 'array',
					items: Object.assign({}, objectSchema)
				}
			}
		}
	}

	return schema;
}

const registerHelper = (fastify) => {
	fastify.decorate('createCRUDRoutes', function( handlers, objectSchema ) {
		const fastify = this;

		if (handlers.create) {

		}
	});
}

