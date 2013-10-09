(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Gmaps4Rails.Google.Circle = (function(_super) {
    __extends(Circle, _super);

    Circle.include(Gmaps4Rails.Interfaces.Basic);

    Circle.include(Gmaps4Rails.Google.Shared);

    Circle.extend(Gmaps4Rails.Circle.Class);

    Circle.extend(Gmaps4Rails.Configuration);

    function Circle(circle, controller) {
      var circleOptions, mergedOptions;
      this.controller = controller;
      if (circle === this.controller.circles[0]) {
        if (circle.strokeColor != null) {
          this.controller.circles_conf.strokeColor = circle.strokeColor;
        }
        if (circle.strokeOpacity != null) {
          this.controller.circles_conf.strokeOpacity = circle.strokeOpacity;
        }
        if (circle.strokeWeight != null) {
          this.controller.circles_conf.strokeWeight = circle.strokeWeight;
        }
        if (circle.fillColor != null) {
          this.controller.circles_conf.fillColor = circle.fillColor;
        }
        if (circle.fillOpacity != null) {
          this.controller.circles_conf.fillOpacity = circle.fillOpacity;
        }
      }
      if ((circle.lat != null) && (circle.lng != null)) {
        circleOptions = {
          center: this.createLatLng(circle.lat, circle.lng),
          strokeColor: circle.strokeColor || this.controller.circles_conf.strokeColor,
          strokeOpacity: circle.strokeOpacity || this.controller.circles_conf.strokeOpacity,
          strokeWeight: circle.strokeWeight || this.controller.circles_conf.strokeWeight,
          fillOpacity: circle.fillOpacity || this.controller.circles_conf.fillOpacity,
          fillColor: circle.fillColor || this.controller.circles_conf.fillColor,
          clickable: circle.clickable || this.controller.circles_conf.clickable,
          zIndex: circle.zIndex || this.controller.circles_conf.zIndex,
          radius: circle.radius
        };
        mergedOptions = this.mergeObjects(this.controller.circles_conf.raw, circleOptions);
        this.serviceObject = new google.maps.Circle(mergedOptions);
        this.serviceObject.setMap(this.controller.getMapObject());
      }
    }

    return Circle;

  })(Gmaps4Rails.Common);

}).call(this);
