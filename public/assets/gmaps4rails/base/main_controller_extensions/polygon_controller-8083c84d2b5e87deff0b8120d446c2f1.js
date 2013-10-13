(function() {
  this.Gmaps4Rails.PolygonController = {
    addPolygons: function(polygonData) {
      var polygonArgs, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = polygonData.length; _i < _len; _i++) {
        polygonArgs = polygonData[_i];
        _results.push(this.polygons.push(this.createPolygon(polygonArgs)));
      }
      return _results;
    },
    replacePolygons: function(polylineData) {
      this.clearPolygons();
      this.addPolygons(polylineData);
      return this.adjustMapToBounds();
    },
    clearPolygons: function() {
      var polygon, _i, _len, _ref;
      _ref = this.polygons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polygon = _ref[_i];
        polygon.clear();
      }
      return this.polygons = [];
    },
    showPolygons: function() {
      var polygon, _i, _len, _ref, _results;
      _ref = this.polygons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polygon = _ref[_i];
        _results.push(polygon.show());
      }
      return _results;
    },
    hidePolygons: function() {
      var polygon, _i, _len, _ref, _results;
      _ref = this.polygons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polygon = _ref[_i];
        _results.push(polygon.hide());
      }
      return _results;
    }
  };

}).call(this);
