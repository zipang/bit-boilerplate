const schema = require('./schema.json');
const { validate } = require('./validate');
const { it, describe } = require("../../tests/describe/");
const ValidationError = require('../ValidationError');

describe(`
Data in the examples section
of the JSON schema should validate`, (expect) => {
	const examples = schema.examples;
	expect.assertions(examples.length);
	examples.forEach(data => {
		expect(validate(data)).toBe(true);
	});
});

describe(`An empty, null or undefined object should not validate`, (expect) => {
	const examples = [null, undefined, {}];
	expect.assertions(examples.length);
	examples.forEach(data => {
		expect(() => validate(data)).toThrow(ValidationError);
	});
});

describe(`Objects with missing properties should not validate`, (expect) => {
	const examples = schema.examples.map(data => Object.assign({}, data, { id: undefined }));
	expect.assertions(examples.length);
	examples.forEach(data => {
		expect(() => validate(data)).toThrow(ValidationError);
	});
});

describe(`Objects with invalid properties types should not validate`, (expect) => {
	const examples = schema.examples.map(data => Object.assign({}, data, { id: Math.random() }));
	expect.assertions(examples.length);
	examples.forEach(data => {
		expect(() => validate(data)).toThrow(ValidationError);
	});
});


