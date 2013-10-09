(function() {
  this.Gmaps = {
    triggerOldOnload: function() {
      if (typeof window.Gmaps.oldOnload === 'function') {
        return window.Gmaps.oldOnload();
      }
    },
    loadMaps: function() {
      var key, value, _ref, _results;
      _ref = window.Gmaps;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        if (/^load_/.test(key)) {
          _results.push(window.Gmaps[key]());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

}).call(this);
