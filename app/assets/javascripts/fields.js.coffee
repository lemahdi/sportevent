# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


# DrawMap =
#   SetLayer: ->
#     map = L.map 'map'
#     L.tileLayer "http://{s}.tile.cloudmade.com/6d272813d7a8485fb5433dfafdef0cb2/997/256/{z}/{x}/{y}.png", {
#       attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, 
#                     <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
#                     Imagery © <a href="http://cloudmade.com">CloudMade</a>',
#       maxZoom: 18
#     }.addTo map
#     map


# $ = jQuery

# $ ->
$(document).ready ->
  if $("#map").length > 0
    fields = []
    for field in $(".field_in_map")
      field = $(field)
      desc = field.data("description")
      addr = $(field).data("address")
      fields.push({
        "lat": field.data("latitude"),
        "lng": field.data("longitude"),
        "name": desc,
        "infowindow":  "<a href=#{addr} data-no-turbolink><b>#{desc}</b></a><br>"
      })
    handler = Gmaps.build('Google')
    handler.buildMap(
      { internal: {id: 'map'}},
      ->
        markers = handler.addMarkers(fields)
        handler.bounds.extendWith(markers)
        handler.fitMapToBounds()
        if $(".field_in_map").length==1 && $(".field_in_map").data("zoom")
          handler.getMap().setZoom($(".field_in_map").data("zoom"))
    )
