# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$(document).ready ->
  if $("#map")
    map = L.mapbox.map('map', 'lemahdi.hj5mcl72')
    # Getting markers
    if $("#field_infos").data("url")
      featureLayer = L.mapbox.featureLayer().loadURL($("#field_infos").data("url")).addTo(map)
      map.setZoom($("#field_infos").data("zoom")) if $("#field_infos").data("zoom")
    else if $("#field_infos").data("geojson")
      featureLayer = L.mapbox.featureLayer($("#field_infos").data("geojson")).addTo(map)
      coord = $("#field_infos").data("geojson")[0]["geometry"]["coordinates"].reverse()
      map.setView(coord, $("#field_infos").data("zoom"))
    # Fit map to markers
    featureLayer.on 'ready', ->
      map.fitBounds(featureLayer.getBounds())
      map.setZoom($("#field_infos").data("zoom")) if $("#field_infos").data("zoom")
    # Centering markers
    featureLayer.on 'click', (e) -> 
      map.panTo(e.layer.getLatLng())
