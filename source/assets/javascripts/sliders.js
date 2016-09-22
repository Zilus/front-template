$(document).ready(function() {
  var b1_start = $("#barra-1").attr("data-slider-value");
  var b2_start = $("#barra-2").attr("data-slider-value");
  $('<style>#barra-1-Slider > .slider-handle:after{content:"'+format("$ #,##0.####",b1_start)+'"}</style>').appendTo('head');
  $('<style>#barra-2-Slider > .slider-handle:after{content:"'+format("$ #,##0.####",b2_start)+'"}</style>').appendTo('head');
  var SliderChange = function() {
    $('<style>#barra-1-Slider > .slider-handle:after{content:"'+format("$ #,##0.####",b1.getValue())+'"}</style>').appendTo('head');
    $('<style>#barra-2-Slider > .slider-handle:after{content:"'+format("$ #,##0.####",b2.getValue())+'"}</style>').appendTo('head');
  };
  if($('#barra-1').size()>0) {
    var b1 = $('#barra-1').slider()
    .on('slide', SliderChange)
    .data('slider');
  }
  if($('#barra-2').size()>0) {
    var b2 = $('#barra-2').slider()
    .on('slide', SliderChange)
    .data('slider');
  }
});
