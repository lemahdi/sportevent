# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$(document).on 'ready page:load', ->
  if $("#map").length > 0
    map_id = 'lemahdi.hj5mcl72'
    if $("#field_infos").data("maptype") == "new"
      map_id = 'lemahdi.i59k4jof'
    map = L.mapbox.map('map', map_id)

    # Getting markers
    if $("#field_infos")
      if $("#field_infos").data("url")
        featureLayer = L.mapbox.featureLayer().loadURL($("#field_infos").data("url")).addTo(map)

      # JSON request
      if $("#field_infos").data("geojson")
        featureLayer = L.mapbox.featureLayer($("#field_infos").data("geojson")).addTo(map)
        coord = $("#field_infos").data("geojson")[0]["geometry"]["coordinates"].reverse()
        map.setView(coord, $("#field_infos").data("zoom"))

      if $("#field_infos").data("zoom")
        map.setZoom($("#field_infos").data("zoom"))

      # Search control
      if $("#field_infos").data("search") == "Y"
        map.addControl(L.mapbox.geocoderControl('lemahdi.hj5mcl72'))

    # New field page
    if $("#field_infos").data("maptype") == "new"
      marker = L.marker(new L.LatLng(0, 0), { draggable: true })
      marker.addTo(map)

      marker.on 'dragend', (e) ->
        $("#latitude").text(marker.getLatLng().lat)
        $("#longitude").text(marker.getLatLng().lng)
        $("#hiddenlat").val(marker.getLatLng().lat)
        $("#hiddenlng").val(marker.getLatLng().lng)

      map.on 'mousemove', (e) ->
        latlng = e.latlng
        coord = "(" + latlng.lat + "," + latlng.lng + ")"
        $("#coordinates").text(coord)
        # $("#coordinates").text(e.containerPoint.toString() + ', ' + e.latlng.toString())

      map.on 'click', (e) ->
        $("#latitude").text(e.latlng.lat)
        $("#longitude").text(e.latlng.lng)
        marker.setLatLng(e.latlng)
        $("#hiddenlat").val(e.latlng.lat)
        $("#hiddenlng").val(e.latlng.lng)

    if featureLayer
      # Fit map to markers
      featureLayer.on 'ready', ->
        map.fitBounds(featureLayer.getBounds())
        map.setZoom($("#field_infos").data("zoom")) if $("#field_infos").data("zoom")

      # Centering markers
      featureLayer.on 'click', (e) -> 
        map.panTo(e.layer.getLatLng())
        if $("#fieldId")
          $("#fieldId").val(e.layer.feature.properties.id)
        if $("#fieldName")
          $("#fieldName").val(e.layer.feature.properties.name)
