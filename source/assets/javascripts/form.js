$(document).ready(function() {
  //wizard
  var current_fs, next_fs, previous_fs;

  $(".next").on( "click", function(event) {
    current_fs = $(this).closest("fieldset");
	  next_fs = current_fs.next();

    $(current_fs).validator('validate');
    var errores = $('.has-error').length;
    if(errores !== 0){
      return false;
    }

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.hide();
  });

  $(".previous").on( "click", function() {
	  current_fs = $(this).closest("fieldset");
	  previous_fs = current_fs.prev();

    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    previous_fs.show();
    current_fs.hide();
  });

  //show edit fields
  $("#editar1").on( "click", function(event) {
    $("#set1 .form-control-gray").toggle();
    $("#set1 .form-control-static").toggle();
  });

  $("#editar2").on( "click", function(event) {
    $("#set2 .form-control-gray").toggle();
    $("#set2 .form-control-static").toggle();
  });

  $(".verificar").on( "click", function() {
    $('#set1').validator('validate');
    $('#set2').validator('validate');
    var errores = $('.has-error').length;
    if(errores !== 0){
      if(!$(".form-control-gray").is(":visible")) {
        $(".form-control-gray").show();
        $(".form-control-static").hide();
      }
      return false;
    }
  });

  $(".awesome-validator").on( "click", function() {
    $('#intro').validator('validate');
    var errores = $('.has-error').length;
    if(errores !== 0){
      return false;
    }
  });

});
