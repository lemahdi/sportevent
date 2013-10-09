(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Openlayers.Map = (function(_super) {
    __extends(Map, _super);

    Map.include(Gmaps4Rails.Interfaces.Map);

    Map.include(Gmaps4Rails.Map);

    Map.include(Gmaps4Rails.Openlayers.Shared);

    Map.include(Gmaps4Rails.Configuration);

    Map.prototype.CONF = {
      disableDefaultUI: false,
      disableDoubleClickZoom: false,
      type: "ROADMAP",
      mapTypeControl: null
    };

    function Map(map_options, controller) {
      var defaultOptions, mergedOpenlayersOptions, openlayersOptions;
      this.controller = controller;
      defaultOptions = this.setConf();
      this.options = this.mergeObjects(map_options, defaultOptions);
      openlayersOptions = {
        center: this.createLatLng(this.options.center_latitude, this.options.center_longitude),
        zoom: this.options.zoom
      };
      mergedOpenlayersOptions = this.mergeObjects(map_options.raw, openlayersOptions);
      this.serviceObject = new OpenLayers.Map(this.options.id, mergedOpenlayersOptions);
      this.serviceObject.addLayer(new OpenLayers.Layer.OSM());
    }

    Map.prototype.extendBoundsWithMarker = function(marker) {
      return this.boundsObject.extend(this.createLatLng(marker.lat, marker.lng));
    };

    Map.prototype.extendBoundsWithPolyline = function(polyline) {};

    Map.prototype.extendBoundsWithPolygon = function(polygon) {};

    Map.prototype.extendBoundsWithCircle = function(circle) {};

    Map.prototype.extendBound = function(bound) {};

    Map.prototype.fitBounds = function() {
      return this.serviceObject.zoomToExtent(this.boundsObject, true);
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
