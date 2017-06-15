var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $listaTemas = $("#lista-temas");

var cargarPagina = function(){
  $('.modal').modal();
  cargarTemas();
  $("#agregar-btn").click(agregarTema);
  $("#busqueda").submit(filtrarTemas);
}

var plantillaTema = "<tr>"+
          "<td>__autor__</td>"+
          "<td>__mensaje__</td>"+
          "<td>__respuestas__</td>"+
        "</tr>";

var cargarTemas = function () {
  $.getJSON(api.url, function (tema) {
    tema.forEach(crearTema);
  });
};


var crearTema = function (tema) {
  var $plantillaFinal = "";
  var $autor = tema.author_name;
  var $mensaje = tema.content;
  // var $id = tarea.id;
  var $respuestas = tema.responses_count;

  $plantillaFinal += plantillaTema.replace("__autor__", $autor)
  .replace("__mensaje__", $mensaje)
  .replace("__respuestas__", $respuestas)

  $listaTemas.append($plantillaFinal);
};

var agregarTema = function (e) {
  e.preventDefault();
  var $obtenerAutor = $("#texto-autor").val();
  var $obtenerMensaje = $("#texto-mensaje").val();

  $.post(api.url, {author_name: $obtenerAutor, content: $obtenerMensaje }, function (tema) {
    crearTema(tema);

  });
};

var filtrarTemas = function (e) {
	e.preventDefault();
	var $busqueda = $("#buscar").val().toLowerCase();
  var $autor = tema.author_name;
	var $temaFiltrados = $autor.filter(function (temas) {
		return temas.author_name.toLowerCase().indexOf($busqueda) >= 0;
	});
crearTema($temaFiltrados);
};

$(document).ready(cargarPagina);
