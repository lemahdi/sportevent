(function() {
  Gmaps4Rails.Google = {};

  Gmaps4Rails.Google.Shared = {
    createPoint: function(lat, lng) {
      return new google.maps.Point(lat, lng);
    },
    createSize: function(width, height) {
      return new google.maps.Size(width, height);
    },
    createLatLng: function(lat, lng) {
      return new google.maps.LatLng(lat, lng);
    },
    createLatLngBounds: function() {
      return new google.maps.LatLngBounds();
    },
    clear: function() {
      return this.serviceObject.setMap(null);
    },
    show: function() {
      return this.serviceObject.setVisible(true);
    },
    hide: function() {
      return this.serviceObject.setVisible(false);
    },
    isVisible: function() {
      return this.serviceObject.getVisible();
    }
  };

}).call(this);
