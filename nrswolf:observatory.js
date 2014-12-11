Observatory = {
  buildCSV: function(collection) {
    var output = [];
    var headers = this.buildHeaders(collection);

    output.push(headers);
  },

  buildHeaders: function(collection) {
    var headers = [];

    collection.forEach(function(item, _index) {
      for (var key in item) {
        if (headers.indexOf(key) === 1) {
          break;
        }

        headers.push(key);
      }
    });

    return headers;
  }
};
