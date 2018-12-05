const { create, schema } = require('./index');
const { it, describe } = require("../../tests/describe/");
const ValidationError = require('../ValidationError');

describe(`A new Todo object should be created with valid data`, (expect) => {
	const examples = schema.examples;
	expect.assertions(examples.length);
	examples.forEach(data => {
		expect(create(data)).toEqual(data);
	});
});

describe(`A new Todo object can only be modified with valid data`, (expect) => {

	const todo = create(schema.examples[0]);

	expect.assertions(2);

	todo.id = 'something-else';
	expect(todo.id).toBe('something-else');

	expect(() => { todo.content = 42 }).toThrow(ValidationError);

});
