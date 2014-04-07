# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'ready page:load', ->
	$('#match_date').datetimepicker({
    language: 'fr'
    pickTime: false
  }) if $('#match_date').length > 0

$(document).on 'ready page:load', ->
  $('#match_time').datetimepicker({
    language: 'fr'
    pickDate: false
  }) if $('#match_time').length > 0
