(function() {
  this.Gmaps4Rails.MarkerController = {
    addMarkers: function(markersData) {
      var index, lat, latLng, lng, markerData, newMarker, _i, _len;
      if (this.markerClusterer != null) {
        this.clearClusterer();
      }
      for (index = _i = 0, _len = markersData.length; _i < _len; index = ++_i) {
        markerData = markersData[index];
        lat = markerData.lat;
        lng = markerData.lng;
        if (this.markers_conf.randomize) {
          latLng = this.randomize(lat, lng);
          lat = latLng[0];
          lng = latLng[1];
        }
        newMarker = this.createMarker({
          "marker_picture": markerData.picture ? markerData.picture : this.markers_conf.picture,
          "marker_width": markerData.width ? markerData.width : this.markers_conf.width,
          "marker_height": markerData.height ? markerData.height : this.markers_conf.length,
          "marker_title": markerData.title ? markerData.title : null,
          "marker_anchor": markerData.marker_anchor ? markerData.marker_anchor : null,
          "shadow_anchor": markerData.shadow_anchor ? markerData.shadow_anchor : null,
          "shadow_picture": markerData.shadow_picture ? markerData.shadow_picture : null,
          "shadow_width": markerData.shadow_width ? markerData.shadow_width : null,
          "shadow_height": markerData.shadow_height ? markerData.shadow_height : null,
          "marker_draggable": markerData.draggable ? markerData.draggable : this.markers_conf.draggable,
          "rich_marker": markerData.rich_marker ? markerData.rich_marker : null,
          "zindex": markerData.zindex ? markerData.zindex : null,
          "lat": lat,
          "lng": lng,
          "index": index
        });
        Gmaps4Rails.Common.mergeWith.call(newMarker, markerData);
        newMarker.createInfoWindow();
        this.markers.push(newMarker);
      }
      return this.clusterize();
    },
    replaceMarkers: function(new_markers) {
      this.clearMarkers();
      this.markers = [];
      this.boundsObject = this.createLatLngBounds();
      return this.addMarkers(new_markers);
    },
    clearMarkers: function() {
      var marker, _i, _len, _ref;
      if (this.markerClusterer != null) {
        this.clearClusterer();
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.clear();
      }
      return this.markers = [];
    },
    showMarkers: function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(marker.show());
      }
      return _results;
    },
    hideMarkers: function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(marker.hide());
      }
      return _results;
    },
    randomize: function(Lat0, Lng0) {
      var Lat, Lng, dx, dy;
      dx = this.markers_conf.max_random_distance * this.random();
      dy = this.markers_conf.max_random_distance * this.random();
      Lat = parseFloat(Lat0) + (180 / Math.PI) * (dy / 6378137);
      Lng = parseFloat(Lng0) + (90 / Math.PI) * (dx / 6378137) / Math.cos(Lat0);
      return [Lat, Lng];
    }
  };

}).call(this);
