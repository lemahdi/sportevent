!function(){var e={}.hasOwnProperty,r=function(r,t){function n(){this.constructor=r}for(var o in t)e.call(t,o)&&(r[o]=t[o]);return n.prototype=t.prototype,r.prototype=new n,r.__super__=t.prototype,r};Gmaps4Rails.Google.Marker=function(e){function t(e,r){var t;this.controller=r,t=this.createLatLng(e.lat,e.lng),this._isBasicMarker(e)?this._createBasicMarker(t,e):null!=e.rich_marker?this._createRichMarker(t,e):this._createMarker(t,e)}return r(t,e),t.include(Gmaps4Rails.Interfaces.Marker),t.include(Gmaps4Rails.Google.Shared),t.include(Gmaps4Rails.Marker.Instance),t.extend(Gmaps4Rails.Marker.Class),t.extend(Gmaps4Rails.Configuration),t.CONF={clusterer_gridSize:50,clusterer_maxZoom:5,custom_cluster_pictures:null,custom_infowindow_class:null,raw:{}},t.prototype.createInfoWindow=function(){var e;return"function"==typeof this.controller.jsTemplate||null!=this.description?("function"==typeof this.controller.jsTemplate&&(this.description=this.controller.jsTemplate(this)),null!=this.controller.markers_conf.custom_infowindow_class?(e=document.createElement("div"),e.setAttribute("class",this.controller.markers_conf.custom_infowindow_class),e.innerHTML=this.description,this.infowindow=new InfoBox(this.infobox(e)),google.maps.event.addListener(this.serviceObject,"click",this._openInfowindow())):(this.infowindow=new google.maps.InfoWindow({content:this.description}),google.maps.event.addListener(this.serviceObject,"click",this._openInfowindow()))):void 0},t.prototype._createBasicMarker=function(e,r){var t,n;return t={position:e,map:this.getMap(),title:r.marker_title,draggable:r.marker_draggable,zIndex:r.zindex},n=this.mergeObjects(this.controller.markers_conf.raw,t),this.serviceObject=new google.maps.Marker(n)},t.prototype._createRichMarker=function(e,r){return this.serviceObject=new RichMarker({position:e,map:this.getMap(),draggable:r.marker_draggable,content:r.rich_marker,flat:null!=r.marker_anchor?r.marker_anchor[1]:!1,anchor:null!=r.marker_anchor?r.marker_anchor[0]:null,zIndex:r.zindex})},t.prototype._createMarker=function(e,r){var t,n,o,i,a,s;return n=this._createImageAnchorPosition(r.marker_anchor),a=this._createImageAnchorPosition(r.shadow_anchor),o=this._createOrRetrieveImage(r.marker_picture,r.marker_width,r.marker_height,n),s=this._createOrRetrieveImage(r.shadow_picture,r.shadow_width,r.shadow_height,a),t={position:e,map:this.getMap(),icon:o,title:r.marker_title,draggable:r.marker_draggable,shadow:s,zIndex:r.zindex},i=this.mergeObjects(this.controller.markers_conf.raw,t),this.serviceObject=new google.maps.Marker(i)},t.prototype._includeMarkerImage=function(e){var r,t,n,o,i;for(i=this.controller.markerImages,r=n=0,o=i.length;o>n;r=++n)if(t=i[r],t.url===e)return r;return!1},t.prototype._createOrRetrieveImage=function(e,r,t,n){var o,i;return"undefined"==typeof e||""===e||null===e?null:(i=this._includeMarkerImage(e))?"number"==typeof i?this.controller.markerImages[i]:!1:(o=this._createMarkerImage(e,this.createSize(r,t),null,n,null),this.controller.markerImages.push(o),o)},t.prototype._isBasicMarker=function(e){return null==e.marker_picture&&null==e.rich_marker},t.prototype._createMarkerImage=function(e,r,t,n,o){return new google.maps.MarkerImage(e,r,t,n,o)},t.prototype._createImageAnchorPosition=function(e){return null===e?null:this.createPoint(e[0],e[1])},t.prototype._openInfowindow=function(){var e;return e=this,function(){return e.controller._closeVisibleInfoWindow(),e.infowindow.open(e.getMap(),e.serviceObject),e.controller._setVisibleInfoWindow(e.infowindow)}},t}(Gmaps4Rails.Common)}.call(this);