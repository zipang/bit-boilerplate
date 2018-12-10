const { run } = require('./index');

const runTests = async() => {
	const testResults = await run(process.argv[2]);
	console.dir(testResults);
}

runTests();
