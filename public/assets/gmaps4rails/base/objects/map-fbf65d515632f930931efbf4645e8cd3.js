!function(){this.Gmaps4Rails.Map={DEFAULT_CONF:{id:"map",draggable:!0,detect_location:!1,center_on_user:!1,center_latitude:0,center_longitude:0,zoom:7,maxZoom:null,minZoom:null,auto_adjust:!0,auto_zoom:!0,bounds:[],raw:{}},adjustToBounds:function(){return this.boundsObject=this.createLatLngBounds(),this.extendBoundsWithMarkers(),this.extendBoundsWithPolylines(),this.extendBoundsWithPolygons(),this.extendBoundsWithCircles(),this.extendBoundsWithLatLng(),this.adaptToBounds()},extendBoundsWithMarkers:function(){var t,n,o,e,s;for(e=this.controller.markers,s=[],n=0,o=e.length;o>n;n++)t=e[n],t.isVisible()?s.push(this.extendBoundsWithMarker(t)):s.push(void 0);return s},extendBoundsWithPolylines:function(){var t,n,o,e,s;for(e=this.controller.polylines,s=[],n=0,o=e.length;o>n;n++)t=e[n],s.push(this.extendBoundsWithPolyline(t));return s},extendBoundsWithPolygons:function(){var t,n,o,e,s;for(e=this.controller.polygons,s=[],n=0,o=e.length;o>n;n++)t=e[n],s.push(this.extendBoundsWithPolygon(t));return s},extendBoundsWithCircles:function(){var t,n,o,e,s;for(e=this.controller.circles,s=[],n=0,o=e.length;o>n;n++)t=e[n],s.push(this.extendBoundsWithCircle(t));return s},extendBoundsWithLatLng:function(){var t,n,o,e,s;for(e=this.options.bounds,s=[],n=0,o=e.length;o>n;n++)t=e[n],s.push(this.extendBound(t));return s},autoAdjustRequested:function(){return this.options.auto_adjust||this.options.bounds.length>0}}}.call(this);