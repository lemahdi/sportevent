(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Bing.Map = (function(_super) {
    __extends(Map, _super);

    Map.include(Gmaps4Rails.Interfaces.Map);

    Map.include(Gmaps4Rails.Map);

    Map.include(Gmaps4Rails.Bing.Shared);

    Map.include(Gmaps4Rails.Configuration);

    Map.prototype.CONF = {
      type: "road"
    };

    function Map(map_options, controller) {
      var bingOptions, defaultOptions, mergedBingOptions;
      this.controller = controller;
      defaultOptions = this.setConf();
      this.options = this.mergeObjects(map_options, defaultOptions);
      bingOptions = {
        credentials: this.options.provider_key,
        mapTypeId: this._getMapType(this.options),
        center: this.createLatLng(this.options.center_latitude, this.options.center_longitude),
        zoom: this.options.zoom
      };
      mergedBingOptions = this.mergeObjects(map_options.raw, bingOptions);
      this.serviceObject = new Microsoft.Maps.Map(document.getElementById(this.options.id), mergedBingOptions);
    }

    Map.prototype.extendBoundsWithMarkers = function() {
      var locationsArray, marker, _i, _len, _ref;
      locationsArray = [];
      _ref = this.controller.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        locationsArray.push(marker.serviceObject.getLocation());
      }
      return this.boundsObject = Microsoft.Maps.LocationRect.fromLocations(locationsArray);
    };

    Map.prototype.extendBoundsWithPolyline = function(polyline) {};

    Map.prototype.extendBoundsWithPolygon = function(polygon) {};

    Map.prototype.extendBoundsWithCircle = function(circle) {};

    Map.prototype.extendBound = function(bound) {};

    Map.prototype.adaptToBounds = function() {
      return this._fitBounds();
    };

    Map.prototype.centerMapOnUser = function(position) {
      return this.serviceObject.setView({
        center: position
      });
    };

    Map.prototype._fitBounds = function() {
      return this.serviceObject.setView({
        bounds: this.boundsObject
      });
    };

    Map.prototype._getMapType = function(map_options) {
      switch (map_options.type) {
        case "road":
          return Microsoft.Maps.MapTypeId.road;
        case "aerial":
          return Microsoft.Maps.MapTypeId.aerial;
        case "auto":
          return Microsoft.Maps.MapTypeId.auto;
        case "birdseye":
          return Microsoft.Maps.MapTypeId.birdseye;
        case "collinsBart":
          return Microsoft.Maps.MapTypeId.collinsBart;
        case "mercator":
          return Microsoft.Maps.MapTypeId.mercator;
        case "ordnanceSurvey":
          return Microsoft.Maps.MapTypeId.ordnanceSurvey;
        default:
          return Microsoft.Maps.MapTypeId.auto;
      }
    };

    return Map;

  })(Gmaps4Rails.Common);

}).call(this);
