(function() {
  Gmaps4Rails.Interfaces || (Gmaps4Rails.Interfaces = {});

  Gmaps4Rails.Interfaces.Controller = {
    getModule: function() {
      throw "getModule should be implemented in controller";
    },
    createClusterer: function(markers_array) {
      throw "createClusterer should be implemented in controller";
    },
    clearClusterer: function() {
      throw "clearClusterer should be implemented in controller";
    }
  };

}).call(this);
