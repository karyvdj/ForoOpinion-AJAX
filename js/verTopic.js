var topicId = getParameterByName('topic_id');

//Solo por propositos de debug
if(topicId){
  alert("El topic ID es:"+topicId);
}

var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'+ topicId
}
var plantillaFinal = '';
var cargarPagina = function() {
  cargarTemas();
};

var cargarTemas = function() {
  $.getJSON(api.url, function(tema) {

      var autor = tema.author_name;
      var contenido = tema.content;
      var id = tema.id;
      var respuestas = tema.responses_count;
      plantillaFinal += plantilla.replace("__autor__", autor)
        .replace("__mensaje__", contenido)
        .replace("__id__", id)
        .replace("__respuestas__", respuestas);

    $('#topic').html(plantillaFinal);
  });

};


var plantilla= "<section class='containe'>"+
  "<div class='row'>"+
      "<div class='col s12 m6'>"+
        "<div class='card  cyan darken-1'>"+
          "<div class='card-content white-text'>"+
            "<span class='card-title'>Detalles de tema</span>"+
              "<h6>Autor: <span><small id='autor'>__autor___ </small> </span> </h6>"+
              "<h6>Tema: <span><small id='tema'> </small>__mensaje__ </span></h6>"+
              "<h6>Respuestas: <span><small id='respuesta'> </small>__respuestas__ </span> </h6>"+
          "</div>"+
        "</div>"+
      "</div>"+
    "</div>"+
"</section>";





  $(document).ready(cargarPagina);
