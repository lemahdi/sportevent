(function() {
  var moduleKeywords,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  this.Gmaps4Rails = {};

  this.Gmaps4Rails.Common = (function() {
    function Common() {}

    Common.extend = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Common.include = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((_ref = obj.included) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Common.prototype.exists = function(var_name) {
      return var_name !== "" && typeof var_name !== "undefined";
    };

    Common.prototype.mergeObjects = function(object, defaultObject) {
      return this.constructor.mergeObjects(object, defaultObject);
    };

    Common.mergeObjects = function(object, defaultObject) {
      var copy_object, key, value;
      copy_object = {};
      for (key in object) {
        value = object[key];
        copy_object[key] = value;
      }
      for (key in defaultObject) {
        value = defaultObject[key];
        if (copy_object[key] == null) {
          copy_object[key] = value;
        }
      }
      return copy_object;
    };

    Common.mergeWith = function(object) {
      var key, value, _results;
      _results = [];
      for (key in object) {
        value = object[key];
        if (this[key] == null) {
          _results.push(this[key] = value);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Common.prototype.random = function() {
      return Math.random() * 2 - 1;
    };

    return Common;

  })();

}).call(this);
