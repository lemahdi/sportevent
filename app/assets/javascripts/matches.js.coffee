# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'ready page:load', ->
	$("#match_date").datetimepicker({
    language: 'fr'
    pickTime: false
  }) if $("#match_date").length > 0

  $("#match_time").datetimepicker({
    language: 'fr'
    pickDate: false
  }) if $("#match_time").length > 0

  $("#selectedGroupId").on 'change', ->
  	$("#groupId").val($("#selectedGroupId").val()) if $("#selectedGroupId").val() != ''

  $("#sendMatchInvitToGroup").on 'click', ->
  	# if $("#groupId").val() == ''
  	alert "<%= I18n.t(:send, scope: 'custom.verb') %>"
