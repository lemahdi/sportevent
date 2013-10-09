(function() {
  this.Gmaps4Rails.Marker = {};

  this.Gmaps4Rails.Marker.Class = {
    DEFAULT_CONF: {
      title: null,
      picture: null,
      width: 22,
      length: 32,
      draggable: false,
      do_clustering: false,
      randomize: false,
      max_random_distance: 100,
      list_container: null,
      offset: 0,
      raw: {}
    }
  };

  this.Gmaps4Rails.Marker.Instance = {
    getMap: function() {
      return this.controller.getMapObject();
    }
  };

}).call(this);
