(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Gmaps4Rails.Google.Map = (function(_super) {
    __extends(Map, _super);

    Map.include(Gmaps4Rails.Interfaces.Map);

    Map.include(Gmaps4Rails.Map);

    Map.include(Gmaps4Rails.Google.Shared);

    Map.include(Gmaps4Rails.Configuration);

    Map.prototype.CONF = {
      disableDefaultUI: false,
      disableDoubleClickZoom: false,
      type: "ROADMAP",
      mapTypeControl: null
    };

    function Map(map_options, controller) {
      var defaultOptions, googleOptions, mergedGoogleOptions;
      this.controller = controller;
      defaultOptions = this.setConf();
      this.options = this.mergeObjects(map_options, defaultOptions);
      googleOptions = {
        maxZoom: this.options.maxZoom,
        minZoom: this.options.minZoom,
        zoom: this.options.zoom,
        center: this.createLatLng(this.options.center_latitude, this.options.center_longitude),
        mapTypeId: google.maps.MapTypeId[this.options.type],
        mapTypeControl: this.options.mapTypeControl,
        disableDefaultUI: this.options.disableDefaultUI,
        disableDoubleClickZoom: this.options.disableDoubleClickZoom,
        draggable: this.options.draggable
      };
      mergedGoogleOptions = this.mergeObjects(map_options.raw, googleOptions);
      this.serviceObject = new google.maps.Map(document.getElementById(this.options.id), mergedGoogleOptions);
    }

    Map.prototype.extendBoundsWithMarker = function(marker) {
      return this.boundsObject.extend(marker.serviceObject.position);
    };

    Map.prototype.extendBoundsWithPolyline = function(polyline) {
      var point, polyline_points, _i, _len, _results;
      polyline_points = polyline.serviceObject.latLngs.getArray()[0].getArray();
      _results = [];
      for (_i = 0, _len = polyline_points.length; _i < _len; _i++) {
        point = polyline_points[_i];
        _results.push(this.boundsObject.extend(point));
      }
      return _results;
    };

    Map.prototype.extendBoundsWithPolygon = function(polygon) {
      var point, polygon_points, _i, _len, _results;
      polygon_points = polygon.serviceObject.latLngs.getArray()[0].getArray();
      _results = [];
      for (_i = 0, _len = polygon_points.length; _i < _len; _i++) {
        point = polygon_points[_i];
        _results.push(this.boundsObject.extend(point));
      }
      return _results;
    };

    Map.prototype.extendBoundsWithCircle = function(circle) {
      this.boundsObject.extend(circle.serviceObject.getBounds().getNorthEast());
      return this.boundsObject.extend(circle.serviceObject.getBounds().getSouthWest());
    };

    Map.prototype.extendBound = function(bound) {
      return this.boundsObject.extend(this.createLatLng(bound.lat, bound.lng));
    };

    Map.prototype.adaptToBounds = function() {
      var map_center;
      if (!this.options.auto_zoom) {
        map_center = this.boundsObject.getCenter();
        this.options.center_latitude = map_center.lat();
        this.options.center_longitude = map_center.lng();
        return this.serviceObject.setCenter(map_center);
      } else {
        return this.fitBounds();
      }
    };

    Map.prototype.fitBounds = function() {
      if (!this.boundsObject.isEmpty()) {
        return this.serviceObject.fitBounds(this.boundsObject);
      }
    };

    Map.prototype.centerMapOnUser = function(position) {
      return this.serviceObject.setCenter(position);
    };

    return Map;

  })(Gmaps4Rails.Common);

}).call(this);
