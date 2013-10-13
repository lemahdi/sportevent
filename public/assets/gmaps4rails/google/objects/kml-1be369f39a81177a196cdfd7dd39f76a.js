(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Google.Kml = (function(_super) {
    __extends(Kml, _super);

    Kml.include(Gmaps4Rails.Interfaces.Basic);

    Kml.include(Gmaps4Rails.Google.Shared);

    Kml.include(Gmaps4Rails.Kml.Instance);

    function Kml(kmlData, controller) {
      var kml;
      this.controller = controller;
      this.options = kmlData.options || {};
      this.options = this.mergeObjects(this.options, this.DEFAULT_CONF);
      kml = new google.maps.KmlLayer(kmlData.url, this.options);
      kml.setMap(this.controller.getMapObject());
      this.serviceObject = kml;
    }

    return Kml;

  })(Gmaps4Rails.Common);

}).call(this);
