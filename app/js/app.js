function generate(name){

  var json = {interfaces:{}, dadinterfaces:{}};

  //Gets interfaces
  $.each( $('.interfaces'), function(index, value){
    if($(value).val() != ''){
      json.interfaces[index] =  {name: $(value).val()};
    }
  });

  //Gets dad-interfaces
  $.each( $('.dad-interfaces'), function(index, value){
    if($(value).val() != ''){
     json.dadinterfaces[index] = {name: $(value).val()};
   }
  });

  /*USE THIS IF WE JUST DO STATIC FIELDS
  var data = $("form").serializeArray();

  //Turns array into json for template
  $.each( data, function ( index, val ) {
    json[ val.name ] = val.value;
  });
  */

  /*Displays Handlebars Template*/
  var source = $("#" + name + "-template").html();
  var template = Handlebars.compile(source);
  var config = template(json);
  $("#output").html(config);

}

//Displays config when dropdown is selected from nav bar
function loadConfig(name){

  //Loads a config based of name
  $("#form-container").load("templates/_template_" + name + "_input.html");
  $("#included").load("config_templates/_template_" + name + "_output.html");
  $("#included-interfaces").load("templates/_template_interfaces.html");
  $("#included-dad-interfaces").load("templates/_template_dad_interfaces.html");
  $("#title").html(name.toUpperCase() + " Config");

}

$(document).ready(function(){

  //Loads a default template to start
  loadConfig("vss");

  //Add new interface record
  $(document.body).on('click', 'span.add-interfaces', function(){
    addElement('interfaces');
  });

  $(document.body).on('click', 'span.add-dad-interfaces', function(){
    addElement('dad-interfaces');
  });

  //Removes parent element
  $(document.body).on('click', 'span.remove-element', function(){
    $(this).parent().remove();
  });

  //Does IP input masks
  $(".ip-address").inputmask("999.999.999.999");
});

Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

function addElement(element){

  var source   = $("#" + element +  "-template").html();
  var template = Handlebars.compile(source);
  var field = template();
  $('#additional-' + element).append(field);

}
