var lazy = new LazyFingers();

var docs = [
	{name: 'Abc'},
	{name: 'AAcb'},
	{name: 'abc.js'}
];

var actual;
var expected;

lazy.add(docs);

test('Basic', function() {
	actual = lazy.find('abc');
	expected = [
		{
			doc: docs[0],
			positions: [0, 1, 2]
		},
		{
			doc: docs[2],
			positions: [0, 1, 2]
		}
	]

	deepEqual(actual, expected, 'Correct docs and positions');
});

test('Duplicate character', function() {
	actual = lazy.find('aa');
	expected = [
		{
			doc: docs[1],
			positions: [0, 1]
		}
	]

	deepEqual(actual, expected, 'Correct docs and positions');
});

test('RegExp special character', function() {
	actual = lazy.find('.js');
	expected = [
		{
			doc: docs[2],
			positions: [3, 4, 5]
		}
	]

	deepEqual(actual, expected, 'Correct docs and positions');
});