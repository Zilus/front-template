$(document).ready(function() {
  //nomina
  $("#nomina-si").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#nomina-no").removeClass('btn-primary-shadow');
    $("#nomina-no").addClass('btn-default');
    $("#nomina-input").prop( "checked", true );
  });
  $("#nomina-no").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#nomina-si").removeClass('btn-primary-shadow');
    $("#nomina-si").addClass('btn-default');
    $("#nomina-input").prop( "checked", false );
  });
  //apoyo
  $("#apoyo-infonavit").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#apoyo-fovissste").removeClass('btn-primary-shadow');
    $("#apoyo-fovissste").addClass('btn-default');
    $("#infonavit-input").prop( "checked", true );
    $("#fovissste-input").prop( "checked", false );
  });
  $("#apoyo-fovissste").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#apoyo-infonavit").removeClass('btn-primary-shadow');
    $("#apoyo-infonavit").addClass('btn-default');
    $("#infonavit-input").prop( "checked", false );
    $("#fovissste-input").prop( "checked", true );
  });
});
