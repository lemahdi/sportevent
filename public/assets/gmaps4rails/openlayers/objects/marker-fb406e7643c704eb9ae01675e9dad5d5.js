(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Openlayers.Marker = (function(_super) {
    __extends(Marker, _super);

    Marker.include(Gmaps4Rails.Interfaces.Marker);

    Marker.include(Gmaps4Rails.Openlayers.Shared);

    Marker.include(Gmaps4Rails.Marker.Instance);

    Marker.extend(Gmaps4Rails.Marker.Class);

    Marker.extend(Gmaps4Rails.Configuration);

    function Marker(args, controller) {
      this.controller = controller;
      this.controller._createMarkersLayer();
      this._createMarkerStyle(args);
      if (this._isBasicMarker(args)) {
        this._styleForBasicMarker(args);
      } else {
        this._styleForCustomMarker(args);
      }
      this.serviceObject = new OpenLayers.Feature.Vector(this.createPoint(args.lat, args.lng), null, this.style_mark);
      this.serviceObject.geometry.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      this.controller.markersLayer.addFeatures([this.serviceObject]);
    }

    Marker.prototype.createInfoWindow = function() {
      if (this.description != null) {
        return this.serviceObject.infoWindow = this.description;
      }
    };

    Marker.prototype.isVisible = function() {
      return true;
    };

    Marker.prototype._isBasicMarker = function(args) {
      return args.marker_picture == null;
    };

    Marker.prototype._createMarkerStyle = function(args) {
      this.style_mark = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
      this.style_mark.fillOpacity = 1;
      return this.style_mark.graphicTitle = args.marker_title;
    };

    Marker.prototype._styleForBasicMarker = function(args) {
      this.style_mark.graphicHeight = 30;
      return this.style_mark.externalGraphic = "http://openlayers.org/dev/img/marker-blue.png";
    };

    Marker.prototype._styleForCustomMarker = function(args) {
      this.style_mark.graphicWidth = args.marker_width;
      this.style_mark.graphicHeight = args.marker_height;
      this.style_mark.externalGraphic = args.marker_picture;
      if (args.marker_anchor != null) {
        this.style_mark.graphicXOffset = args.marker_anchor[0];
        this.style_mark.graphicYOffset = args.marker_anchor[1];
      }
      if (args.shadow_picture != null) {
        this.style_mark.backgroundGraphic = args.shadow_picture;
        this.style_mark.backgroundWidth = args.shadow_width;
        this.style_mark.backgroundHeight = args.shadow_height;
        if (args.shadow_anchor != null) {
          this.style_mark.backgroundXOffset = args.shadow_anchor[0];
          return this.style_mark.backgroundYOffset = args.shadow_anchor[1];
        }
      }
    };

    return Marker;

  })(Gmaps4Rails.Common);

}).call(this);
