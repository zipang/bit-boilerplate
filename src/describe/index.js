// Use the internal node.js assertion library
const assert = require("assert");


const expectInContext = (description) => {
	let asserted = 0;

	const interceptAssertion = {
		get: function(target, assertionName, receiver) {
			const assertion = target[assertionName];
			if (typeof assertion === "function") {
				return function (...args) {
					asserted++;
					return assertion.apply(this, args);
				};
			}
			return assertion;
		}
	};

	const expect = (result) => new Proxy({
		toBe: (expected) => assert.strictEqual(result, expected, description),
		toEqual: (expected) => assert.deepStrictEqual(result, expected, description),
	}, interceptAssertion);

	expect.assertions = (howmany) => {
		expect.planned = howmany;
	}
	expect.asserted = asserted;

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
		//console.error(err);
		testResult.success = false;
		testResult.errors = err;
	}
	testResult.elapsed  = new Date() - start;
	testResult.planned  = expect.planned;
	testResult.asserted = expect.asserted;
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
	it
}
