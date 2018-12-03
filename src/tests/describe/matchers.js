const assert = require("assert");

/**
 * Implements a subset of Jest expect API using only node js assert
 * @see https://jestjs.io/docs/en/expect
 * @see https://nodejs.org/api/assert.html
 * @param   {String} description the assertion context
 * @returns {Object} containing all the assertions methods
 */
const assertionsFor = (result, description) => ({
	toBe: (expected) => assert.strictEqual(result, expected, description),
	toEqual: (expected) => assert.deepStrictEqual(result, expected, description),
	toThrow: (expected) => assert.throws(result, expected, description),
	toContain: (expected) => {
		if (result && typeof result.indexOf === "function") { // String and Arrays have this method
			assert(result.indexOf(expected) !== -1, description);
		} else {
			assert(false, description);
		}
	},
})

module.exports = assertionsFor;
