(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Gmaps4Rails.Google.Marker = (function(_super) {
    __extends(Marker, _super);

    Marker.include(Gmaps4Rails.Interfaces.Marker);

    Marker.include(Gmaps4Rails.Google.Shared);

    Marker.include(Gmaps4Rails.Marker.Instance);

    Marker.extend(Gmaps4Rails.Marker.Class);

    Marker.extend(Gmaps4Rails.Configuration);

    Marker.CONF = {
      clusterer_gridSize: 50,
      clusterer_maxZoom: 5,
      custom_cluster_pictures: null,
      custom_infowindow_class: null,
      raw: {}
    };

    function Marker(args, controller) {
      var markerLatLng;
      this.controller = controller;
      markerLatLng = this.createLatLng(args.lat, args.lng);
      if (this._isBasicMarker(args)) {
        this._createBasicMarker(markerLatLng, args);
      } else {
        if (args.rich_marker != null) {
          this._createRichMarker(markerLatLng, args);
        } else {
          this._createMarker(markerLatLng, args);
        }
      }
    }

    Marker.prototype.createInfoWindow = function() {
      var boxText;
      if (typeof this.controller.jsTemplate === "function" || (this.description != null)) {
        if (typeof this.controller.jsTemplate === "function") {
          this.description = this.controller.jsTemplate(this);
        }
        if (this.controller.markers_conf.custom_infowindow_class != null) {
          boxText = document.createElement("div");
          boxText.setAttribute("class", this.controller.markers_conf.custom_infowindow_class);
          boxText.innerHTML = this.description;
          this.infowindow = new InfoBox(this.infobox(boxText));
          return google.maps.event.addListener(this.serviceObject, 'click', this._openInfowindow());
        } else {
          this.infowindow = new google.maps.InfoWindow({
            content: this.description
          });
          return google.maps.event.addListener(this.serviceObject, 'click', this._openInfowindow());
        }
      }
    };

    Marker.prototype._createBasicMarker = function(markerLatLng, args) {
      var defaultOptions, mergedOptions;
      defaultOptions = {
        position: markerLatLng,
        map: this.getMap(),
        title: args.marker_title,
        draggable: args.marker_draggable,
        zIndex: args.zindex
      };
      mergedOptions = this.mergeObjects(this.controller.markers_conf.raw, defaultOptions);
      return this.serviceObject = new google.maps.Marker(mergedOptions);
    };

    Marker.prototype._createRichMarker = function(markerLatLng, args) {
      return this.serviceObject = new RichMarker({
        position: markerLatLng,
        map: this.getMap(),
        draggable: args.marker_draggable,
        content: args.rich_marker,
        flat: args.marker_anchor != null ? args.marker_anchor[1] : false,
        anchor: args.marker_anchor != null ? args.marker_anchor[0] : null,
        zIndex: args.zindex
      });
    };

    Marker.prototype._createMarker = function(markerLatLng, args) {
      var defaultOptions, imageAnchorPosition, markerImage, mergedOptions, shadowAnchorPosition, shadowImage;
      imageAnchorPosition = this._createImageAnchorPosition(args.marker_anchor);
      shadowAnchorPosition = this._createImageAnchorPosition(args.shadow_anchor);
      markerImage = this._createOrRetrieveImage(args.marker_picture, args.marker_width, args.marker_height, imageAnchorPosition);
      shadowImage = this._createOrRetrieveImage(args.shadow_picture, args.shadow_width, args.shadow_height, shadowAnchorPosition);
      defaultOptions = {
        position: markerLatLng,
        map: this.getMap(),
        icon: markerImage,
        title: args.marker_title,
        draggable: args.marker_draggable,
        shadow: shadowImage,
        zIndex: args.zindex
      };
      mergedOptions = this.mergeObjects(this.controller.markers_conf.raw, defaultOptions);
      return this.serviceObject = new google.maps.Marker(mergedOptions);
    };

    Marker.prototype._includeMarkerImage = function(obj) {
      var index, object, _i, _len, _ref;
      _ref = this.controller.markerImages;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        object = _ref[index];
        if (object.url === obj) {
          return index;
        }
      }
      return false;
    };

    Marker.prototype._createOrRetrieveImage = function(currentMarkerPicture, markerWidth, markerHeight, imageAnchorPosition) {
      var markerImage, test_image_index;
      if (typeof currentMarkerPicture === "undefined" || currentMarkerPicture === "" || currentMarkerPicture === null) {
        return null;
      }
      if (!(test_image_index = this._includeMarkerImage(currentMarkerPicture))) {
        markerImage = this._createMarkerImage(currentMarkerPicture, this.createSize(markerWidth, markerHeight), null, imageAnchorPosition, null);
        this.controller.markerImages.push(markerImage);
        return markerImage;
      } else {
        if (typeof test_image_index === 'number') {
          return this.controller.markerImages[test_image_index];
        }
        return false;
      }
    };

    Marker.prototype._isBasicMarker = function(args) {
      return (args.marker_picture == null) && (args.rich_marker == null);
    };

    Marker.prototype._createMarkerImage = function(markerPicture, markerSize, origin, anchor, scaledSize) {
      return new google.maps.MarkerImage(markerPicture, markerSize, origin, anchor, scaledSize);
    };

    Marker.prototype._createImageAnchorPosition = function(anchorLocation) {
      if (anchorLocation === null) {
        return null;
      } else {
        return this.createPoint(anchorLocation[0], anchorLocation[1]);
      }
    };

    Marker.prototype._openInfowindow = function() {
      var that;
      that = this;
      return function() {
        that.controller._closeVisibleInfoWindow();
        that.infowindow.open(that.getMap(), that.serviceObject);
        return that.controller._setVisibleInfoWindow(that.infowindow);
      };
    };

    return Marker;

  })(Gmaps4Rails.Common);

}).call(this);
