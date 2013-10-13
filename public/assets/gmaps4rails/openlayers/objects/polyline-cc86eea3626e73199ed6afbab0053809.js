(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Openlayers.Polyline = (function(_super) {
    __extends(Polyline, _super);

    Polyline.include(Gmaps4Rails.Interfaces.Basic);

    Polyline.include(Gmaps4Rails.Openlayers.Shared);

    Polyline.extend(Gmaps4Rails.Polyline.Class);

    Polyline.extend(Gmaps4Rails.Configuration);

    function Polyline(polyline, controller) {
      var clickable, element, latlng, line_points, line_style, polyline_coordinates, strokeColor, strokeOpacity, strokeWeight, zIndex, _i, _len;
      this.controller = controller;
      this.controller._createPolylinesLayer();
      polyline_coordinates = [];
      for (_i = 0, _len = polyline.length; _i < _len; _i++) {
        element = polyline[_i];
        if (element === polyline[0]) {
          strokeColor = element.strokeColor || this.controller.polylines_conf.strokeColor;
          strokeOpacity = element.strokeOpacity || this.controller.polylines_conf.strokeOpacity;
          strokeWeight = element.strokeWeight || this.controller.polylines_conf.strokeWeight;
          clickable = element.clickable || this.controller.polylines_conf.clickable;
          zIndex = element.zIndex || this.controller.polylines_conf.zIndex;
        }
        if ((element.lat != null) && (element.lng != null)) {
          latlng = new OpenLayers.Geometry.Point(element.lng, element.lat);
          polyline_coordinates.push(latlng);
        }
      }
      line_points = new OpenLayers.Geometry.LineString(polyline_coordinates);
      line_style = {
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWidth: strokeWeight
      };
      this.serviceObject = new OpenLayers.Feature.Vector(line_points, null, line_style);
      this.serviceObject.geometry.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      this.controller.polylinesLayer.addFeatures([this.serviceObject]);
    }

    Polyline.prototype.isVisible = function() {
      return true;
    };

    return Polyline;

  })(Gmaps4Rails.Common);

}).call(this);
