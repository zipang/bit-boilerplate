const { resolveObjects } = require("./index.js");
const { it } = require("../describe/");

it("works", async (expect) => {
	expect.assertions(2);

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

	tests.forEach(test=>{
		expect(resolveObjects(test.input)).toEqual(test.output);
	});
});
