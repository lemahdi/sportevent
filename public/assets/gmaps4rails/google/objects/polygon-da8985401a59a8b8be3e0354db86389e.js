!function(){var o={}.hasOwnProperty,t=function(t,l){function e(){this.constructor=t}for(var n in l)o.call(l,n)&&(t[n]=l[n]);return e.prototype=l.prototype,t.prototype=new e,t.__super__=l.prototype,t};this.Gmaps4Rails.Google.Polygon=function(o){function l(o,t){var l,e,n,s,r,i,c,a,p,g,h,f,y,u;for(this.controller=t,a=[],y=0,u=o.length;u>y;y++)i=o[y],s=this.createLatLng(i.lat,i.lng),a.push(s),i===o[0]&&(p=i.strokeColor||this.controller.polygons_conf.strokeColor,g=i.strokeOpacity||this.controller.polygons_conf.strokeOpacity,h=i.strokeWeight||this.controller.polygons_conf.strokeWeight,e=i.fillColor||this.controller.polygons_conf.fillColor,n=i.fillOpacity||this.controller.polygons_conf.fillOpacity,l=i.clickable||this.controller.polygons_conf.clickable,f=i.zIndex||this.controller.polygons_conf.zIndex);c={path:a,strokeColor:p,strokeOpacity:g,strokeWeight:h,clickable:l,zIndex:f},r=this.mergeObjects(t.polygons_conf.raw,c),this.serviceObject=new google.maps.Polygon(r),this.serviceObject.setMap(t.getMapObject())}return t(l,o),l.include(Gmaps4Rails.Interfaces.Basic),l.include(Gmaps4Rails.Google.Shared),l.extend(Gmaps4Rails.Polygon.Class),l.extend(Gmaps4Rails.Configuration),l}(Gmaps4Rails.Common)}.call(this);