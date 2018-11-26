// Use the internal node.js assertion library
const assert = require("assert");

/**
 * Implements a subset of Jest describe() API using only internal assert
 * @param  {Object}  the result to encapsulate with this assertions
 * @param  {String}  description of an assertion context
 * @returns {Object} containing all the assertions methods
 */
const assertionsFor = (result, description) => ({
	toBe:    (expected) => assert.strictEqual(result, expected, description),
	toEqual: (expected) => assert.deepStrictEqual(result, expected, description),
})

module.exports = assertionsFor;
