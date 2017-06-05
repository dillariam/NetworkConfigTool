function generate(name){

  var json = {interfaces:{}, dadinterfaces:{}, vpcinterface:{}};

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

  //Gets vpc-interfaces
  $.each( $('.vpc-interfaces'), function(index, value){
    if($(value).val() != ''){
     json.vpcinterface[index] = {name: $(value).val()};
   }
  });

  //Will add extra fields to json that don't have a skip class
  var data = $("form input:not(.skip)").serializeArray();
  //Turns array into json for template
  $.each( data, function ( index, val ) {
    json[ val.name ] = val.value;
  });


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

  //Adds another dad interface
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

//Adds 1 to a handlebars loop with {{counter @index}}
Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

//Checks to see if object is empty
Handlebars.registerHelper("if_not_empty", function (a, opts){
  if (a[0]  == undefined) {
      return opts.inverse(this);
  } else {
      return opts.fn(this);
  }
});

//Add input elements
function addElement(element){

  var source   = $("#" + element +  "-template").html();
  var template = Handlebars.compile(source);
  var field = template();
  $('#additional-' + element).append(field);

}
