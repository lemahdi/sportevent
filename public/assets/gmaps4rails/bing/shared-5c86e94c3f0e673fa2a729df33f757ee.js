(function() {
  Gmaps4Rails.Bing = {};

  Gmaps4Rails.Bing.Shared = {
    createPoint: function(lat, lng) {
      return new Microsoft.Maps.Point(lat, lng);
    },
    createLatLng: function(lat, lng) {
      return new Microsoft.Maps.Location(lat, lng);
    },
    createLatLngBounds: function() {},
    createSize: function(width, height) {
      return new google.maps.Size(width, height);
    },
    _addToMap: function(object) {
      return this.controller.getMapObject().entities.push(object);
    },
    _removeFromMap: function(object) {
      return this.controller.getMapObject().entities.remove(object);
    }
  };

}).call(this);
