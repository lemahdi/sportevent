(function() {
  Gmaps4Rails.Openlayers = {};

  Gmaps4Rails.Openlayers.Shared = {
    createPoint: function(lat, lng) {
      return new OpenLayers.Geometry.Point(lng, lat);
    },
    createLatLng: function(lat, lng) {
      return new OpenLayers.LonLat(lng, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    },
    createAnchor: function(offset) {
      if (offset === null) {
        return null;
      }
      return new OpenLayers.Pixel(offset[0], offset[1]);
    },
    createSize: function(width, height) {
      return new OpenLayers.Size(width, height);
    },
    createLatLngBounds: function() {
      return new OpenLayers.Bounds();
    }
  };

}).call(this);
