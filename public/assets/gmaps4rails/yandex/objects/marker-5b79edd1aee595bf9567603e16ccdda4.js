(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Yandex.Marker = (function(_super) {
    __extends(Marker, _super);

    Marker.include(Gmaps4Rails.Interfaces.Marker);

    Marker.include(Gmaps4Rails.Yandex.Shared);

    Marker.include(Gmaps4Rails.Marker.Instance);

    Marker.extend(Gmaps4Rails.Marker.Class);

    Marker.extend(Gmaps4Rails.Configuration);

    function Marker(args, controller) {
      var markerLatLng;
      this.controller = controller;
      markerLatLng = this.createLatLng(args.lat, args.lng);
      this.style_mark = {};
      if (args.marker_picture != null) {
        this._styleForCustomMarker(args);
      }
      this.serviceObject = new ymaps.Placemark(markerLatLng, {
        balloonContent: this.description,
        iconContent: args.marker_title
      }, this.style_mark);
      this._addToMap(this.serviceObject);
    }

    Marker.prototype.isVisible = function() {
      return true;
    };

    Marker.prototype.clear = function() {
      return this._removeFromMap(this.serviceObject);
    };

    Marker.prototype.show = function() {
      return this.serviceObject.options.set("visible", true);
    };

    Marker.prototype.hide = function() {
      return this.serviceObject.options.set("visible", false);
    };

    Marker.prototype.createInfoWindow = function() {
      if (this.description != null) {
        return this.serviceObject.properties.set("balloonContent", this.description);
      }
    };

    Marker.prototype._styleForCustomMarker = function(args) {
      this.style_mark.iconImageHref = args.marker_picture;
      this.style_mark.iconImageSize = [args.marker_width, args.marker_height];
      if (args.marker_anchor != null) {
        this.style_mark.iconImageOffset = args.marker_anchor;
      }
      if (args.shadow_picture != null) {
        this.style_mark.iconShadow = true;
        this.style_mark.iconShadowImageHref = args.shadow_picture;
        this.style_mark.iconShadowImageSize = [args.shadow_width, args.shadow_height];
        if ((args.shadow_width != null) && (args.shadow_height != null)) {
          this.style_mark.iconShadowOffset = [args.shadow_width, args.shadow_height];
        }
        if (args.shadow_anchor != null) {
          return this.style_mark.iconShadowOffset = args.shadow_anchor;
        }
      }
    };

    return Marker;

  })(Gmaps4Rails.Common);

}).call(this);
