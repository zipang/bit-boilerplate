const ValidationError = require('../ValidationError');

/**
 * Validate some data against the todos schema
 * @param {Object} data
 */
const validate = (data) => {
	const errors = [];

	if (typeof data !== 'object' || data === null) {
		throw new ValidationError('todos', data, 'Todos must be an object');
	}
	['id', 'content'].forEach(propertyName => {
		if (typeof data[propertyName] !== 'string') {
			errors.push(`${propertyName} must be a string and is ${data[propertyName]}`);
		}
	})
	if (errors.length) {
		throw new ValidationError('todos', data, errors);
	}

	return true;
}


module.exports = { validate };
