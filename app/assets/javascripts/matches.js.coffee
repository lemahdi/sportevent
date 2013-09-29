# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

//= require bootstrap-datepicker/core
//= require bootstrap-datepicker/locales/bootstrap-datepicker.fr

$(document).on 'ready page:load', -> $('.date').datepicker({
    format: 'dd-mm-yyyy'
    autoclose: true
    todayHighlight: true
    language: 'fr'
});
