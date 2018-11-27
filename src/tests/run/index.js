#! /usr/bin/env node
const path = require("path");

// test results should be appended to this array
const testResults = [];

testResults.append = (testResult) => {
	// Find the position where to insert the new result
	// (the array is ordered by the start time of each test)
	let pos = 0;
	while (pos < testResults.length) {
		if (testResults[pos].start > testResult.start) break;
		pos++;
	}
	testResults.splice(pos, 0, testResult);
}

/**
 * @see https://docs.bitsrc.io/docs/ext-testing.html#test-results-object
 * @param {String} specFile full path to a spec file
 * @return {Object} test results in bit format
 */
function run(specFile) {
	let start = new Date();
	let failures = [];
	let testName = path.basename(specFile);
	try {
		await require(specFile);
	} catch (err) {
		failures.push({
			title: `${testName} has failed`,
			err: {
				message: err.message,
				stack: err.stack
			}
		});
	}
	return {
		tests: testResults,
		stats: {
			start: start,
			end: new Date()
		},
		failures: failures
	}
}

module.exports = {
    run,
    globals: {
        testResults
    },
    modules: {
        // Your modules here...
    }
};

