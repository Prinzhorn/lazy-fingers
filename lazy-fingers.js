(function(window, undefined) {
	var LazyFingers = window.LazyFingers = function(options) {
		options = options || {};

		this.options = {
			idAttribute: options.idAttribute || 'id',
			indexAttribute: options.indexAttribute || 'name'
		};

		this._index = {};
		this._documentsById = {};
	};

	LazyFingers.fn = LazyFingers.prototype;

	LazyFingers.fn.index = function(docs) {
		var docsIndex = 0;
		var docsLength = docs.length;
		var indexAttribute = this.options.indexAttribute;
		var idAttribute = this.options.idAttribute;
		var doc;
		var docData;
		var index;
		var docsById = this._documentsById;
		var docDataIndex;
		var docDataLength;
		var docDataCharacter;

		//Iterate over all documents we want to add to the index.
		for(; docsIndex < docsLength; docsIndex++) {
			doc = docs[docsIndex];
			docData = doc[indexAttribute];

			docsById[doc[idAttribute]] = doc;

			//Does the document have any data to index?
			if(docData === undefined || docData === null) {
				continue;
			}

			docData = ('' + docData).toLowerCase().replace(/\s+/, '').split('');

			index = this._index;
			docDataIndex = 0;
			docDataLength = docData.length;

			//Iterate over all characters inside this document's data field.
			for(; docDataIndex < docDataLength; docDataIndex++) {
				docDataCharacter = docData[docDataIndex];

				index = index[docDataCharacter] = index[docDataCharacter] || {};
				index._d = index._d || [];

				//Add a reference to the current document to the index at this position.
				index._d.push(doc);
			}
		}
	};

	LazyFingers.fn.find = function(input) {
		input = input.toLowerCase().split('');

		var results = [];
		var data = this._indexData;
		var indexIndex = 0;
		var indexLength = data.length;
		var indexEntry;
		var inputIndex = 0;
		var inputLength = input.length;
		var inputCharacter;

		for(; indexIndex < indexLength; indexIndex++) {
			indexEntry = data[indexIndex];

			for(; inputIndex < inputLength; inputIndex++) {
				inputCharacter = input[inputIndex];
			}
		}

		return results;
	};
}(window));