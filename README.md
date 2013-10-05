lazy-fingers
============

Client side text search for lazy people. Similar to Sublime Text's fuzzy search.

See it in action on http://prinzhorn.github.io/lazy-fingers/

API
---

### `LazyFingers([options])` constructor

```js
var lazy = LazyFingers();
```

Options with defaults:

```js
{
	indexAttribute: 'name'//the field to be indexed for later search
}
```

### `add(documents)` method

Adds the array of `documents` to the index.

```js
lazy.add([
	{name: 'foo'},
	{name: 'bar'}
]);
```

### `find(query)` method

Returns an array of match objects. A match object looks like this

```js
{
	doc: {}//A reference to the indexed document,
	positions: []//An array of indexes of matching characters.
}
```

```js
var matches = lazy.find('fbr');
```

### `highlight(match, fn)` method

A helper function to highlight matches (i.e. one of the `matches` returned from `find`). The `fn` function does the actual highlighting on the character it gets as a parameter.

```js
var match = matches[0];

LazyFingers.hightlight(match, function(c) {
	return '<b>' + c + '</b>';
});
```