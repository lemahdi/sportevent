(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Google.Polyline = (function(_super) {
    __extends(Polyline, _super);

    Polyline.include(Gmaps4Rails.Interfaces.Basic);

    Polyline.include(Gmaps4Rails.Google.Shared);

    Polyline.extend(Gmaps4Rails.Polyline.Class);

    Polyline.extend(Gmaps4Rails.Configuration);

    function Polyline(polyline, controller) {
      var clickable, decoded_array, element, icons, mergedOptions, point, polyOptions, polyline_coordinates, strokeColor, strokeOpacity, strokeWeight, zIndex, _i, _j, _len, _len1;
      polyline_coordinates = [];
      for (_i = 0, _len = polyline.length; _i < _len; _i++) {
        element = polyline[_i];
        if (element.coded_array != null) {
          decoded_array = new google.maps.geometry.encoding.decodePath(element.coded_array);
          for (_j = 0, _len1 = decoded_array.length; _j < _len1; _j++) {
            point = decoded_array[_j];
            polyline_coordinates.push(point);
          }
        } else {
          if (element === polyline[0]) {
            strokeColor = element.strokeColor || controller.polylines_conf.strokeColor;
            strokeOpacity = element.strokeOpacity || controller.polylines_conf.strokeOpacity;
            strokeWeight = element.strokeWeight || controller.polylines_conf.strokeWeight;
            clickable = element.clickable || controller.polylines_conf.clickable;
            zIndex = element.zIndex || controller.polylines_conf.zIndex;
            icons = element.icons || controller.polylines_conf.icons;
          }
          if ((element.lat != null) && (element.lng != null)) {
            polyline_coordinates.push(this.createLatLng(element.lat, element.lng));
          }
        }
      }
      polyOptions = {
        path: polyline_coordinates,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWeight: strokeWeight,
        clickable: clickable,
        zIndex: zIndex,
        icons: icons
      };
      mergedOptions = this.mergeObjects(controller.polylines_conf.raw, polyOptions);
      this.serviceObject = new google.maps.Polyline(mergedOptions);
      this.serviceObject.setMap(controller.getMapObject());
    }

    return Polyline;

  })(Gmaps4Rails.Common);

}).call(this);
