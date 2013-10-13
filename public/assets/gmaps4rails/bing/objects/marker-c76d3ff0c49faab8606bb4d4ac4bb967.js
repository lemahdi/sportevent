(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Bing.Marker = (function(_super) {
    __extends(Marker, _super);

    Marker.include(Gmaps4Rails.Interfaces.Marker);

    Marker.include(Gmaps4Rails.Bing.Shared);

    Marker.include(Gmaps4Rails.Marker.Instance);

    Marker.extend(Gmaps4Rails.Marker.Class);

    Marker.extend(Gmaps4Rails.Configuration);

    Marker.CONF = {
      infobox: "description"
    };

    function Marker(args, controller) {
      var anchorLatLng, markerLatLng;
      this.controller = controller;
      markerLatLng = this.createLatLng(args.lat, args.lng);
      anchorLatLng = this._createImageAnchorPosition([args.lat, args.lng]);
      if (args.marker_picture != null) {
        this.serviceObject = new Microsoft.Maps.Pushpin(markerLatLng, {
          draggable: args.marker_draggable,
          anchor: anchorLatLng,
          icon: args.marker_picture,
          height: args.marker_height,
          text: args.marker_title,
          width: args.marker_width
        });
      } else {
        this.serviceObject = new Microsoft.Maps.Pushpin(markerLatLng, {
          draggable: args.marker_draggable,
          anchor: anchorLatLng,
          text: args.marker_title
        });
      }
      this._addToMap(this.serviceObject);
    }

    Marker.prototype.createInfoWindow = function() {
      if (this.description != null) {
        if (this.controller.markers_conf.infobox === "description") {
          this.info_window = new Microsoft.Maps.Infobox(this.serviceObject.getLocation(), {
            description: this.description,
            visible: false,
            showCloseButton: true
          });
        } else {
          this.info_window = new Microsoft.Maps.Infobox(this.serviceObject.getLocation(), {
            htmlContent: this.description,
            visible: false
          });
        }
        Microsoft.Maps.Events.addHandler(this.serviceObject, 'click', this._openInfoWindow(this.controller, this.info_window));
        return this._addToMap(this.info_window);
      }
    };

    Marker.prototype.isVisible = function() {
      return true;
    };

    Marker.prototype.clear = function() {
      return this._removeFromMap(this.serviceObject);
    };

    Marker.prototype.show = function() {
      return this.serviceObject.setOptions({
        visible: true
      });
    };

    Marker.prototype.hide = function() {
      return this.serviceObject.setOptions({
        visible: false
      });
    };

    Marker.prototype._openInfoWindow = function(controller, infoWindow) {
      return function() {
        if (controller.visibleInfoWindow) {
          controller.visibleInfoWindow.setOptions({
            visible: false
          });
        }
        infoWindow.setOptions({
          visible: true
        });
        return controller.visibleInfoWindow = infoWindow;
      };
    };

    Marker.prototype._createImageAnchorPosition = function(anchorLocation) {
      if (anchorLocation == null) {
        return null;
      }
      return this.createPoint(anchorLocation[0], anchorLocation[1]);
    };

    return Marker;

  })(Gmaps4Rails.Common);

}).call(this);
