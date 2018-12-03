const { resolveObjects } = require("./index.js");
const { it } = require("../../tests/describe/");

it("works", async (expect) => {

	const tests = [
		{
			input: {
				a:{
					b:{
						c: 'z',
					},
				},
				'a.b.d': 'y',
			},
			output: {
				a:{
					b:{
						c: 'z',
						d: 'y',
					},
				},
			},
		}
	];

	expect.assertions(tests.length);
	tests.forEach(test=>{
		expect(resolveObjects(test.input)).toEqual(test.output);
	});
});
