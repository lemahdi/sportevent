(function() {
  this.Gmaps4Rails.Map = {
    DEFAULT_CONF: {
      id: 'map',
      draggable: true,
      detect_location: false,
      center_on_user: false,
      center_latitude: 0,
      center_longitude: 0,
      zoom: 7,
      maxZoom: null,
      minZoom: null,
      auto_adjust: true,
      auto_zoom: true,
      bounds: [],
      raw: {}
    },
    adjustToBounds: function() {
      this.boundsObject = this.createLatLngBounds();
      this.extendBoundsWithMarkers();
      this.extendBoundsWithPolylines();
      this.extendBoundsWithPolygons();
      this.extendBoundsWithCircles();
      this.extendBoundsWithLatLng();
      return this.adaptToBounds();
    },
    extendBoundsWithMarkers: function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.controller.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        if (marker.isVisible()) {
          _results.push(this.extendBoundsWithMarker(marker));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    extendBoundsWithPolylines: function() {
      var polyline, _i, _len, _ref, _results;
      _ref = this.controller.polylines;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polyline = _ref[_i];
        _results.push(this.extendBoundsWithPolyline(polyline));
      }
      return _results;
    },
    extendBoundsWithPolygons: function() {
      var polygon, _i, _len, _ref, _results;
      _ref = this.controller.polygons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polygon = _ref[_i];
        _results.push(this.extendBoundsWithPolygon(polygon));
      }
      return _results;
    },
    extendBoundsWithCircles: function() {
      var circle, _i, _len, _ref, _results;
      _ref = this.controller.circles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        circle = _ref[_i];
        _results.push(this.extendBoundsWithCircle(circle));
      }
      return _results;
    },
    extendBoundsWithLatLng: function() {
      var bound, _i, _len, _ref, _results;
      _ref = this.options.bounds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bound = _ref[_i];
        _results.push(this.extendBound(bound));
      }
      return _results;
    },
    autoAdjustRequested: function() {
      return this.options.auto_adjust || this.options.bounds.length > 0;
    }
  };

}).call(this);
