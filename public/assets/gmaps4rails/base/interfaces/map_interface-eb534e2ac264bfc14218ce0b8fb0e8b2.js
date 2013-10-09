(function() {
  Gmaps4Rails.Interfaces || (Gmaps4Rails.Interfaces = {});

  Gmaps4Rails.Interfaces.Map = {
    extendBoundsWithMarker: function(marker) {
      throw "extendBoundsWithMarker should be implemented in controller";
    },
    extendBoundsWithPolyline: function(polyline) {
      throw "extendBoundsWithPolyline should be implemented in controller";
    },
    extendBoundsWithPolygon: function(polygon) {
      throw "extendBoundsWithPolygon should be implemented in controller";
    },
    extendBoundsWithCircle: function(circle) {
      throw "extendBoundsWithCircle should be implemented in controller";
    },
    extendBound: function(bound) {
      throw "extendBound should be implemented in controller";
    },
    adaptToBounds: function() {
      throw "adaptToBounds should be implemented in controller";
    },
    fitBounds: function() {
      throw "fitBounds should be implemented in controller";
    },
    centerMapOnUser: function(position) {
      throw "centerMapOnUser should be implemented in controller";
    }
  };

}).call(this);
