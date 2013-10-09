(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Google.Polygon = (function(_super) {
    __extends(Polygon, _super);

    Polygon.include(Gmaps4Rails.Interfaces.Basic);

    Polygon.include(Gmaps4Rails.Google.Shared);

    Polygon.extend(Gmaps4Rails.Polygon.Class);

    Polygon.extend(Gmaps4Rails.Configuration);

    function Polygon(polygon, controller) {
      var clickable, fillColor, fillOpacity, latlng, mergedOptions, point, polyOptions, polygon_coordinates, strokeColor, strokeOpacity, strokeWeight, zIndex, _i, _len;
      this.controller = controller;
      polygon_coordinates = [];
      for (_i = 0, _len = polygon.length; _i < _len; _i++) {
        point = polygon[_i];
        latlng = this.createLatLng(point.lat, point.lng);
        polygon_coordinates.push(latlng);
        if (point === polygon[0]) {
          strokeColor = point.strokeColor || this.controller.polygons_conf.strokeColor;
          strokeOpacity = point.strokeOpacity || this.controller.polygons_conf.strokeOpacity;
          strokeWeight = point.strokeWeight || this.controller.polygons_conf.strokeWeight;
          fillColor = point.fillColor || this.controller.polygons_conf.fillColor;
          fillOpacity = point.fillOpacity || this.controller.polygons_conf.fillOpacity;
          clickable = point.clickable || this.controller.polygons_conf.clickable;
          zIndex = point.zIndex || this.controller.polygons_conf.zIndex;
        }
      }
      polyOptions = {
        path: polygon_coordinates,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWeight: strokeWeight,
        clickable: clickable,
        zIndex: zIndex
      };
      mergedOptions = this.mergeObjects(controller.polygons_conf.raw, polyOptions);
      this.serviceObject = new google.maps.Polygon(mergedOptions);
      this.serviceObject.setMap(controller.getMapObject());
    }

    return Polygon;

  })(Gmaps4Rails.Common);

}).call(this);
