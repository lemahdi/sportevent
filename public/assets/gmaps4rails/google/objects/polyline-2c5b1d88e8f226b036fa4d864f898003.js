!function(){var e={}.hasOwnProperty,o=function(o,l){function n(){this.constructor=o}for(var t in l)e.call(l,t)&&(o[t]=l[t]);return n.prototype=l.prototype,o.prototype=new n,o.__super__=l.prototype,o};this.Gmaps4Rails.Google.Polyline=function(e){function l(e,o){var l,n,t,s,i,a,r,c,p,y,g,f,h,u,d,_;for(c=[],h=0,d=e.length;d>h;h++)if(t=e[h],null!=t.coded_array)for(n=new google.maps.geometry.encoding.decodePath(t.coded_array),u=0,_=n.length;_>u;u++)a=n[u],c.push(a);else t===e[0]&&(p=t.strokeColor||o.polylines_conf.strokeColor,y=t.strokeOpacity||o.polylines_conf.strokeOpacity,g=t.strokeWeight||o.polylines_conf.strokeWeight,l=t.clickable||o.polylines_conf.clickable,f=t.zIndex||o.polylines_conf.zIndex,s=t.icons||o.polylines_conf.icons),null!=t.lat&&null!=t.lng&&c.push(this.createLatLng(t.lat,t.lng));r={path:c,strokeColor:p,strokeOpacity:y,strokeWeight:g,clickable:l,zIndex:f,icons:s},i=this.mergeObjects(o.polylines_conf.raw,r),this.serviceObject=new google.maps.Polyline(i),this.serviceObject.setMap(o.getMapObject())}return o(l,e),l.include(Gmaps4Rails.Interfaces.Basic),l.include(Gmaps4Rails.Google.Shared),l.extend(Gmaps4Rails.Polyline.Class),l.extend(Gmaps4Rails.Configuration),l}(Gmaps4Rails.Common)}.call(this);