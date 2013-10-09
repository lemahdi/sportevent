(function() {
  this.Gmaps4Rails.CircleController = {
    addCircles: function(circleData) {
      var circleArgs, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = circleData.length; _i < _len; _i++) {
        circleArgs = circleData[_i];
        _results.push(this.circles.push(this.createCircle(circleArgs)));
      }
      return _results;
    },
    replaceCircles: function(circleData) {
      this.clearCircles();
      this.addCircles(circleData);
      return this.adjustMapToBounds();
    },
    clearCircles: function() {
      var circle, _i, _len, _ref;
      _ref = this.circles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        circle = _ref[_i];
        circle.clear();
      }
      return this.circles = [];
    },
    showCircles: function() {
      var circle, _i, _len, _ref, _results;
      _ref = this.circles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        circle = _ref[_i];
        _results.push(circle.show());
      }
      return _results;
    },
    hideCircles: function() {
      var circle, _i, _len, _ref, _results;
      _ref = this.circles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        circle = _ref[_i];
        _results.push(circle.hide());
      }
      return _results;
    }
  };

}).call(this);
