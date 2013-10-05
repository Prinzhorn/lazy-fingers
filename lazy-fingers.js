(function(window, undefined) {
	var LazyFingers = window.LazyFingers = function(options) {
		options = options || {};

		this.options = {
			idAttribute: options.idAttribute || 'id',
			indexAttribute: options.indexAttribute || 'name'
		};

		this._index = [];
		this._documentsById = {};
	};

	LazyFingers.fn = LazyFingers.prototype;

	LazyFingers.fn.add = function(docs) {
		var docsIndex = 0;
		var docsLength = docs.length;
		var indexAttribute = this.options.indexAttribute;
		var idAttribute = this.options.idAttribute;
		var doc;
		var docData;
		var docsById = this._documentsById;
		var index = this._index;

		//Iterate over all documents we want to add to the index.
		for(; docsIndex < docsLength; docsIndex++) {
			doc = docs[docsIndex];
			docData = doc[indexAttribute];

			docsById[doc[idAttribute]] = doc;

			//Does the document have any data to index?
			if(docData === undefined || docData === null) {
				continue;
			}

			docData = ('' + docData);

			index.push({
				data: docData,
				doc: doc
			});
		}
	};

	LazyFingers.fn.find = function(input) {
		input = input.replace(/\s+/g, '');
		input = escapeRegExp(input);

		var rx = new RegExp('(' + input.split('').join(').*(') + ')', 'i');
		var results = [];
		var index = this._index;
		var indexIndex = 0;
		var indexLength = index.length;
		var indexEntry;
		var indexEntryData;
		var isMatch;
		var matchedPositions;
		var argumentsIndex;
		var argumentsLength;

		for(; indexIndex < indexLength; indexIndex++) {
			indexEntry = index[indexIndex];
			indexEntryData = indexEntry.data;

			isMatch = false;

			indexEntryData.replace(rx, function() {
				isMatch = true;

				matchedPositions = [];

				argumentsIndex = 1;
				//-3 because we only want the group, not the full string or the index.
				argumentsLength = arguments.length - 2;

				for(; argumentsIndex < argumentsLength; argumentsIndex++) {
					matchedPositions.push(indexEntryData.indexOf(arguments[argumentsIndex]));
				}
			});

			if(isMatch) {
				results.push({
					doc: indexEntry.doc,
					positions: matchedPositions
				});
			}
		}

		return results;
	};

	var escapeRegExp = function(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	};
}(window));