(function() {
  this.Gmaps4Rails.PolylineController = {
    replacePolylines: function(polylineData) {
      this.clearPolylines();
      this.addPolylines(polylineData);
      return this.adjustMapToBounds();
    },
    clearPolylines: function() {
      var polyline, _i, _len, _ref;
      _ref = this.polylines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polyline = _ref[_i];
        polyline.clear();
      }
      return this.polylines = [];
    },
    addPolylines: function(polylineData) {
      var polylineArgs, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = polylineData.length; _i < _len; _i++) {
        polylineArgs = polylineData[_i];
        _results.push(this.polylines.push(this.createPolyline(polylineArgs)));
      }
      return _results;
    },
    showPolylines: function() {
      var polyline, _i, _len, _ref, _results;
      _ref = this.polylines;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polyline = _ref[_i];
        _results.push(polyline.show());
      }
      return _results;
    },
    hidePolylines: function() {
      var polyline, _i, _len, _ref, _results;
      _ref = this.polylines;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polyline = _ref[_i];
        _results.push(polyline.hide());
      }
      return _results;
    }
  };

}).call(this);
