(function() {
  this.Gmaps4Rails.Configuration = {
    setConf: function() {
      if (this.CONF != null) {
        return this.mergeObjects(this.CONF, this.DEFAULT_CONF);
      } else {
        return this.DEFAULT_CONF;
      }
    }
  };

}).call(this);
