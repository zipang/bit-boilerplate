const extractParams = require('./extractParams');

const tests = [
	'/path/to/nothing',
	'/path/to/:objectId',
	'/path/to/:city@:lat-:lng'
]

tests.forEach(test => {
	console.dir(`${test} => ${extractParams(test)}`);
})
