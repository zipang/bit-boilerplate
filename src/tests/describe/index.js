const assertionsFor = require("./matchers");


/**
 * Build an expect function in the context of a test
 * @param {String} description of the test
 * @return {Function} expect: (obj) => assertable
 */
const expectInContext = (description) => {
	let asserted = 0;

	const handleAsserted = {
		get: (target, propertyName, receiver) =>
			(propertyName === "asserted") ? asserted : target[propertyName]
	}

	const interceptAssertion = {
		get: function(target, propertyName, receiver) {
			const assertion = target[propertyName];
			if (typeof assertion === "function") {
				return function (...args) {
					asserted++;
					return assertion.apply(this, args);
				};
			}
			return assertion;
		}
	};

	const expect = (result) => new Proxy(assertionsFor(result, description), interceptAssertion);

	expect.assertions = (howmany) => {
		expect.planned = howmany;
	}

	return new Proxy(expect, handleAsserted);
}

/**
 * Specify the context of execution for a new test suite
 * @param {String} description
 * @param {Function} test
 */
const describe = async (description, test) => {

	let testResult = { title: description },
		expect = expectInContext(description),
		start = Date.now();

	try {
		await test(expect);
		testResult.pass = true;
	} catch (err) {
		//console.error(err);
		testResult.pass = false;
		testResult.err = {
			message: `${err.message} FAILED :
expected ${JSON.stringify(err.expected)}
got ${JSON.stringify(err.actual)}`,
			stack: err.stack
		}
	}
	testResult.start = start; // really important to reorder all test results after their asynchronous execution
	testResult.duration = Date.now() - start;
	testResult.planned  = expect.planned;
	testResult.asserted = expect.asserted;
	console.dir(testResult);

	if (global.testResults) { // this global object is made available by the test runner
		global.testResults.append(testResult);
	}
}


/**
 * This is a single test unit
 * @param {String} purpose
 * @param {Function} test
 */
const it = (purpose, test) => describe(`  * ${purpose} :`, test);

module.exports = {
	describe,
	it
}
