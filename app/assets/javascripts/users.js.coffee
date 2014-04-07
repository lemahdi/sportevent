# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  if $('ul#profile_sidebar li').length > 0
    sidebar_elems = $('ul#profile_sidebar li')
    if /.*\/users\/[0-9]+/.test(window.location.pathname)
      sidebar_elems.first().addClass("active")
    else if /.*\/users\/edit$/.test(window.location.pathname)
      sidebar_elems.last().addClass("active")
      # $(sidebar_elems.get(1)).addClass("active")
