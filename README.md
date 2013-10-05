lazy-fingers
============

Client side text search for lazy people. Similar to Sublime Text's fuzzy search.

See it in action on http://prinzhorn.github.io/lazy-fingers/

API
---

### `LazyFingers([options])`

```js
var lazy = LazyFingers();
```

Options with defaults:

```js
{
	indexAttribute: 'name'//the field to be indexed for later search
}
```

### `add(documents)`

Adds the array of `documents` to the index. A document is a simple JavaScript object which needs at least one property, the `indexAttribute`. Since lazy-fingers only stores references, you can pass any object to it.

```js
lazy.add([
	{name: 'foo'},
	{name: 'bar'}
]);
```

### `find(query)`

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

### `highlight(match, fn)`

A helper function to highlight matches (i.e. one of the `matches` returned from `find`). The `fn` function does the actual highlighting on the character it gets as a parameter.

```js
var match = matches[0];

LazyFingers.hightlight(match, function(c) {
	return '<b>' + c + '</b>';
});
```