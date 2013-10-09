(function() {
  this.Gmaps4Rails.KmlController = {
    addKml: function(kmlData) {
      var kml, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = kmlData.length; _i < _len; _i++) {
        kml = kmlData[_i];
        _results.push(this.kmls.push(this.createKml(kml)));
      }
      return _results;
    }
  };

}).call(this);
