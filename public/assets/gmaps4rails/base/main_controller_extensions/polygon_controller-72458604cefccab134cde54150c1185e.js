!function(){this.Gmaps4Rails.PolygonController={addPolygons:function(o){var n,s,t,l;for(l=[],s=0,t=o.length;t>s;s++)n=o[s],l.push(this.polygons.push(this.createPolygon(n)));return l},replacePolygons:function(o){return this.clearPolygons(),this.addPolygons(o),this.adjustMapToBounds()},clearPolygons:function(){var o,n,s,t;for(t=this.polygons,n=0,s=t.length;s>n;n++)o=t[n],o.clear();return this.polygons=[]},showPolygons:function(){var o,n,s,t,l;for(t=this.polygons,l=[],n=0,s=t.length;s>n;n++)o=t[n],l.push(o.show());return l},hidePolygons:function(){var o,n,s,t,l;for(t=this.polygons,l=[],n=0,s=t.length;s>n;n++)o=t[n],l.push(o.hide());return l}}}.call(this);