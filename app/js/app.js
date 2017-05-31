function generate(){
  var data = $('#cisco1Config').serializeArray();

  console.log(data[0].value);

}

$(document).ready(function(){
  $(".ip-address").inputmask('999.999.999.999');
});
