!function(){var t={}.hasOwnProperty,e=function(e,r){function i(){this.constructor=e}for(var o in r)t.call(r,o)&&(e[o]=r[o]);return i.prototype=r.prototype,e.prototype=new i,e.__super__=r.prototype,e};this.Gmaps4Rails.Yandex.Marker=function(t){function r(t,e){var r;this.controller=e,r=this.createLatLng(t.lat,t.lng),this.style_mark={},null!=t.marker_picture&&this._styleForCustomMarker(t),this.serviceObject=new ymaps.Placemark(r,{balloonContent:this.description,iconContent:t.marker_title},this.style_mark),this._addToMap(this.serviceObject)}return e(r,t),r.include(Gmaps4Rails.Interfaces.Marker),r.include(Gmaps4Rails.Yandex.Shared),r.include(Gmaps4Rails.Marker.Instance),r.extend(Gmaps4Rails.Marker.Class),r.extend(Gmaps4Rails.Configuration),r.prototype.isVisible=function(){return!0},r.prototype.clear=function(){return this._removeFromMap(this.serviceObject)},r.prototype.show=function(){return this.serviceObject.options.set("visible",!0)},r.prototype.hide=function(){return this.serviceObject.options.set("visible",!1)},r.prototype.createInfoWindow=function(){return null!=this.description?this.serviceObject.properties.set("balloonContent",this.description):void 0},r.prototype._styleForCustomMarker=function(t){return this.style_mark.iconImageHref=t.marker_picture,this.style_mark.iconImageSize=[t.marker_width,t.marker_height],null!=t.marker_anchor&&(this.style_mark.iconImageOffset=t.marker_anchor),null!=t.shadow_picture&&(this.style_mark.iconShadow=!0,this.style_mark.iconShadowImageHref=t.shadow_picture,this.style_mark.iconShadowImageSize=[t.shadow_width,t.shadow_height],null!=t.shadow_width&&null!=t.shadow_height&&(this.style_mark.iconShadowOffset=[t.shadow_width,t.shadow_height]),null!=t.shadow_anchor)?this.style_mark.iconShadowOffset=t.shadow_anchor:void 0},r}(Gmaps4Rails.Common)}.call(this);