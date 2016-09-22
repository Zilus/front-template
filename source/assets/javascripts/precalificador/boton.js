$(document).ready(function() {
  //genero
  $("#genero-h").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#genero-m").removeClass('btn-primary-shadow');
    $("#genero-m").addClass('btn-default');
    $("#h-input").prop( "checked", true );
    $("#m-input").prop( "checked", false );
  });
  $("#genero-m").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#genero-h").removeClass('btn-primary-shadow');
    $("#genero-h").addClass('btn-default');
    $("#h-input").prop( "checked", false );
    $("#m-input").prop( "checked", true );
  });

  //Panels
  $("#tarjeta-si").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#tarjeta-no").removeClass('btn-primary-shadow');
    $("#tarjeta-no").addClass('btn-default');
    $("#tarjeta").removeClass('active');
    $("#tarjeta").addClass('active');
    $("#tarjeta-input").prop( "checked", true );
  });
  $("#tarjeta-no").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#tarjeta-si").removeClass('btn-primary-shadow');
    $("#tarjeta-si").addClass('btn-default');
    $("#tarjeta").removeClass('active');
    $("#tarjeta-input").prop( "checked", false );
  });

  $("#hipoteca-si").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#hipoteca-no").removeClass('btn-primary-shadow');
    $("#hipoteca-no").addClass('btn-default');
    $("#hipoteca").removeClass('active');
    $("#hipoteca").addClass('active');
    $("#hipoteca-input").prop( "checked", true );
  });
  $("#hipoteca-no").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#hipoteca-si").removeClass('btn-primary-shadow');
    $("#hipoteca-si").addClass('btn-default');
    $("#hipoteca").removeClass('active');
    $("#hipoteca-input").prop( "checked", false );
  });

  $("#auto-si").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#auto-no").removeClass('btn-primary-shadow');
    $("#auto-no").addClass('btn-default');
    $("#auto").removeClass('active');
    $("#auto").addClass('active');
    $("#auto-input").prop( "checked", true );
  });
  $("#auto-no").on( "click", function() {
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary-shadow');
    $("#auto-si").removeClass('btn-primary-shadow');
    $("#auto-si").addClass('btn-default');
    $("#auto").removeClass('active');
    $("#auto-input").prop( "checked", false );
  });
});
