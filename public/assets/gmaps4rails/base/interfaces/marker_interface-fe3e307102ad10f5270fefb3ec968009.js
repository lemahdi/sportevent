(function() {
  Gmaps4Rails.Interfaces || (Gmaps4Rails.Interfaces = {});

  Gmaps4Rails.Interfaces.Marker = {
    createInfoWindow: function() {
      throw "createInfoWindow should be implemented in marker";
    },
    clear: function() {
      throw "clear should be implemented in marker";
    },
    show: function() {
      throw "show should be implemented in marker";
    },
    hide: function() {
      throw "hide should be implemented in marker";
    }
  };

}).call(this);
