const assert = require("assert");

/**
 * Implements a subset of Jest expect API using only node js assert
 * @see https://jestjs.io/docs/en/expect
 * @see https://nodejs.org/api/assert.html
 * @param  {Object} result is the object we want to assert on
 * @param  {String} description the assertion context
 * @return {Assertable} a wrapped result object on which we can make assertions
 */
const assertionsFor = (result, description) => ({
	toBe: (expected) => assert.strictEqual(result, expected, description),
	toEqual: (expected) => assert.deepStrictEqual(result, expected, description),
	toThrow: (expected) => assert.throws(result, expected, description),
	toBeDefined: () => assert(result !== undefined, description),
	toBeUndefined: () => assert(result === undefined, description),
	toContain: (expected) => {
		if (result && typeof result.indexOf === "function") { // String and Arrays have this method
			assert(result.indexOf(expected) !== -1, description);
		} else {
			assert(false, description);
		}
	},
	toHaveLength: (expected) => assert(typeof result.length === 'number' && result.length === expected, description),
	toHaveMethods: (expected) => {
		assert(Array.isArray(expected), `Expect an array of method names`);
		const missingMethods = expected.filter(methodName => typeof result[methodName] !== 'function');
		assert(missingMethods.length === 0, `Object doesn't have methods '${missingMethods}'`);
	}
})

module.exports = assertionsFor;
