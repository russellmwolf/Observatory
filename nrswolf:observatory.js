Observatory = {
  buildOutput: function(collection) {
    var output = [];

    var headers = this.buildHeaders(collection);
    output.push(headers);

    var that = this;
    collection.forEach(function(item, _index) {
      var itemData = that.buildItemData(item, headers);
      output.push(itemData);
    });

    return output;
  },

  buildHeaders: function(collection) {
    var headers = [];

    collection.forEach(function(item, _index) {
      for (var key in item) {
        if (headers.indexOf(key) === -1) {
          headers.push(key);
        }
      }
    });

    return headers;
  },

  buildItemData: function(item, headers) {
    var itemData = [];

    headers.forEach(function(field, _index) {
      if (!!item[field]) {
        itemData.push(item[field]);
      } else {
        itemData.push(null);
      }
    });

    return itemData;
  },

  buildCSV: function(collection) {
    var name = collection.collection.name.toUpperCase();

    var outputData = this.buildOutput(collection);
    var csvContent = "data:text/csv;charset=utf-8,";

    outputData.forEach(function(infoArray, index) {
      dataString = infoArray.join(",");
      csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
    });

    var encodedUri = encodeURI(csvContent);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name + ".csv");

    link.click();
  }
};
