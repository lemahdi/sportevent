(function() {
  Gmaps4Rails.Interfaces || (Gmaps4Rails.Interfaces = {});

  Gmaps4Rails.Interfaces.Basic = {
    clear: function() {
      throw "clear should be implemented";
    },
    show: function() {
      throw "show should be implemented";
    },
    hide: function() {
      throw "hide should be implemented";
    },
    isVisible: function() {
      throw "hide should be implemented";
    }
  };

}).call(this);
