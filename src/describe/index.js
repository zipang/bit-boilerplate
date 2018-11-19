// Use the internal node.js assertion library
const assert = require("assert");

const matchers = (description) => (result) => ({
	toBe: (expected) => assert.strictEqual(result, expected, description),
	toEqual: (expected) => assert.deepStrictEqual(result, expected, description),
})

const expectInContect = (description) => {
	let asserted = 0;

	const interceptAssertion = {
		get(target, assertionName, receiver) {
			const assertion = target[assertionName];
			return function (...args) {
				asserted++;
				return assertion.apply(this, args);
			};
		}
	};
	const matchers = matchers(description);

	const expect = (result) => new Proxy(matchers, interceptAssertion);

	expect.assertions = (howmany) => {
		expect._planned = howmany;
	}
	expect._asserted = asserted;

	return expect;
}

/**
 * Specify the context of execution for a new test suite
 * @param {String} description
 * @param {Function} testSuite
 */
const describe = async (description, test) => {
	let start = new Date(),
		expect = expectInContext(description),
		testResult = { title: description };
	try {
		await test(expect);
		testResult.success = true;
	} catch (err) {
		testResult.success = false;
		testResult.errors = err;
	}
	testResult.planned = expect._planned;
	testResult.assertions = expect._assertions;
	testResult.elapsed = new Date() - start;
	console.dir(JSON.stringify(testResult));
}


/**
 * This is a part of a test suite
 * @param {String} msg
 * @param {Function} test
 */
const it = (msg, test) => describe(`  * ${msg} :`, test);

module.exports = {
	describe,
	it,
	expect,
}
