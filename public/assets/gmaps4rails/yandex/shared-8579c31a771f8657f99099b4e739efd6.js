(function() {
  Gmaps4Rails.Yandex = {};

  Gmaps4Rails.Yandex.Shared = {
    createPoint: function(lat, lng) {
      return [lat, lng];
    },
    createLatLng: function(lat, lng) {
      return [lat, lng];
    },
    createLatLngBounds: function() {},
    createSize: function(width, height) {
      return [width, height];
    },
    _addToMap: function(object) {
      return this.controller.getMapObject().geoObjects.add(object);
    },
    _removeFromMap: function(object) {
      return this.controller.getMapObject().geoObjects.remove(object);
    }
  };

}).call(this);
