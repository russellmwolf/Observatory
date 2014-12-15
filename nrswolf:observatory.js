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
      flatItem = flatten(item);

      for (var key in flatItem) {
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
      try {
        itemData.push(objectReference(item, field));
      } catch(err){}
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
  },
};

// https://github.com/hughsk/flat
var flatten = function(target, opts) {
  opts = opts || {};

  var delimiter = opts.delimiter || '.';
  var output = {};

  function step(object, prev) {
    Object.keys(object).forEach(function(key) {
      var value = object[key];
      var isarray = opts.safe && Array.isArray(value);
      var type = Object.prototype.toString.call(value);
      var isobject = (
        type === "[object Object]" ||
        type === "[object Array]"
      );

      var newKey = prev ? prev + delimiter + key : key;

      if (!isarray && isobject) {
        return step(value, newKey);
      }

      output[newKey] = value;
    });
  }

  step(target);

  return output;
};

// http://scott.donnel.ly/javascript-function-to-convert-a-string-in-dot-andor-array-notation-into-a-reference/
var objectReference = function (object, reference) {
  function arr_deref(o, ref, i) {
    return !ref ? o : (o[ref.slice(0, i ? -1 : ref.length)]);
  }
  function dot_deref(o, ref) {
    return !ref ? o : ref.split('[').reduce(arr_deref, o);
  }
  return reference.split('.').reduce(dot_deref, object);
};
