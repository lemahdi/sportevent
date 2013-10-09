(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Yandex.Map = (function(_super) {
    __extends(Map, _super);

    Map.include(Gmaps4Rails.Interfaces.Map);

    Map.include(Gmaps4Rails.Map);

    Map.include(Gmaps4Rails.Yandex.Shared);

    Map.include(Gmaps4Rails.Configuration);

    Map.prototype.CONF = {
      disableDefaultUI: false,
      disableDoubleClickZoom: false,
      type: "yandex#map",
      mapTypeControl: null
    };

    function Map(map_options, controller) {
      var defaultOptions, mergedYandexOptions, yandexOptions;
      this.controller = controller;
      defaultOptions = this.setConf();
      this.options = this.mergeObjects(map_options, defaultOptions);
      yandexOptions = {
        center: this.createLatLng(this.options.center_latitude, this.options.center_longitude),
        zoom: this.options.zoom,
        type: this.options.type
      };
      mergedYandexOptions = this.mergeObjects(map_options.raw, yandexOptions);
      this.serviceObject = new ymaps.Map(this.options.id, mergedYandexOptions);
    }

    Map.prototype.extendBoundsWithMarkers = function() {
      return this.boundsObject = this.serviceObject.geoObjects.getBounds();
    };

    Map.prototype.extendBoundsWithPolyline = function(polyline) {};

    Map.prototype.extendBoundsWithPolygon = function(polygon) {};

    Map.prototype.extendBoundsWithCircle = function(circle) {};

    Map.prototype.extendBound = function(bound) {};

    Map.prototype.fitBounds = function() {
      if (this.boundsObject != null) {
        return this.serviceObject.setBounds(this.boundsObject);
      }
    };

    Map.prototype.adaptToBounds = function() {
      return this.fitBounds();
    };

    Map.prototype.centerMapOnUser = function(position) {
      return this.serviceObject.setCenter(position);
    };

    return Map;

  })(Gmaps4Rails.Common);

}).call(this);
